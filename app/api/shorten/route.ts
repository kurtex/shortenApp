import { connectDB } from "@/app/lib/dbConnection";
import { Url } from "@/app/models/urlSchema";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	await connectDB();

	const { longUrl } = await request.json();

	if (!longUrl || !longUrl.startsWith("http")) {
		return NextResponse.json({ error: "URL no válida" }, { status: 400 });
	}

	const urlCode = nanoid(7); // Generates a unique 7-character code
	const shortUrl = `${request.headers.get("host")}/${urlCode}`;

	try {
		let url = await Url.findOne({ originalUrl: longUrl });

		if (url) {
			return NextResponse.json(url);
		} else {
			url = new Url({
				originalUrl: longUrl,
				shortUrl,
				urlCode,
			});

			await url.save();

			return NextResponse.json(url);
		}
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ error: "Error en el servidor" },
			{ status: 500 }
		);
	}
}
