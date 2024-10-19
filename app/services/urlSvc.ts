import { SupabaseClient } from "@supabase/supabase-js";
import { connectToSupabaseDb } from "../lib/database/dbConnection";
import { UrlSchema } from "../models/urlSchema";

// The expiration time for non-logged-in users
const EXPIRATION_TIME_HOURS = 1;

export async function deleteExpiredUrls() {
	const supabaseConnection = connectToSupabaseDb();

	const expirationTime = new Date();

	// URLs more than 1 hour old
	expirationTime.setHours(expirationTime.getHours() - EXPIRATION_TIME_HOURS);

	// Remove URLs that are not associated with authenticated users and have expired
	const { data, error } = await supabaseConnection
		.from("Urls")
		.delete()
		.eq("isAuthenticated", false)
		.lt("createdAt", expirationTime);

	if (error) {
		console.error("Error deleting expired URLs:", error);
		return;
	}

	console.log(`Deleted ${data} expired URLs.`);
}

export async function findByUrlCode(
	connection: SupabaseClient,
	urlCode: string
) {
	return connection.from("urls").select().eq("urlCode", urlCode).select();
}

export async function findByOriginalUrl(
	connection: SupabaseClient,
	originalUrl: string
) {
	return connection.from("urls").select().eq("originalUrl", originalUrl);
}

export async function insertNewShortUrl(
	supabaseConnection: SupabaseClient,
	urlSchema: UrlSchema
) {
	const { originalUrl, shortUrl, urlCode } = urlSchema;

	return await supabaseConnection
		.from("urls")
		.insert({
			originalUrl: originalUrl,
			shortUrl: shortUrl,
			urlCode: urlCode,
		})
		.select();
}
