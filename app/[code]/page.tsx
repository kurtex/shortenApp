import { notFound, redirect } from "next/navigation";
import { findByUrlCode } from "../services/urlSvc";
import { connectToSupabaseDb } from "../lib/database/dbConnection";

type PageParam = {
	params: {
		code: string
	}
};

export default async function Page ({ params }: PageParam) {
	const { code: urlCode } = params;

	const supabaseConnection = connectToSupabaseDb();
	const { data, error } = await findByUrlCode(supabaseConnection, urlCode);

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
