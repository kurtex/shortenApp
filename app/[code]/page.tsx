import { notFound, redirect } from "next/navigation";
import { connectDB } from "../lib/dbConnection";
import { Url } from "../models/urlSchema";

type PageParam = {
	params: {
		code: string
	}
};

export default async function Page ({ params }: PageParam) {
	const { code } = params;
	await connectDB();

	const url = await Url.findOne({ urlCode: code });

	if (url) {
		// Redirect the user to the original URL
		redirect(url.originalUrl);
	}

	// Show 404 if not found
	notFound();
}
