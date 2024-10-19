import { connectToSupabaseDb } from "@/app/lib/database/dbConnection";
import { findByOriginalUrl, insertNewShortUrl } from "@/app/services/urlSvc";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { longUrl: originalUrl } = await request.json();

	if (!originalUrl || !originalUrl.startsWith("http")) {
		return NextResponse.json({ error: "URL no válida" }, { status: 400 });
	}

	const urlCode = nanoid(7); // Generates a unique 7-character code
	const shortUrl = `${request.headers.get("host")}/${urlCode}`;

	const supabaseConnection = connectToSupabaseDb();

	const { data, error } = await findByOriginalUrl(
		supabaseConnection,
		originalUrl
	);

	if (error) {
		console.error(error);

		return NextResponse.json(
			{ error: "Error en el servidor" },
			{ status: 500 }
		);
	}

	if (data?.length !== 0) {
		return NextResponse.json(data[0]);
	} else {
		const { data, error } = await insertNewShortUrl(supabaseConnection, {
			originalUrl,
			shortUrl,
			urlCode,
		});

		if (error) {
			console.error(error);

			return NextResponse.json(
				{ error: "Error en el servidor" },
				{ status: 500 }
			);
		}

		return NextResponse.json(data[0]);
	}
}
