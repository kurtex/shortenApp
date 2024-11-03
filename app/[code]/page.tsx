import { notFound, redirect } from "next/navigation";
import { findByUrlCode } from "../services/urlSvc";




type PageParam = {
	params: {
		code: string;
	};
};

export default async function UrlRedirection ({ params }: PageParam) {
	const { code: urlCode } = params;

	const { data, error } = await findByUrlCode(urlCode);

	if (error) {
		console.error("Query error:", error);
		return;
	}

	const originalUrl = data[0]?.originalUrl;

	if (originalUrl) {
		// Redirect the user to the original URL
		redirect(originalUrl);
	}

	// Show 404 if not found
	notFound();
}
