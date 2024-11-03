import { UrlSchema } from "../lib/database/models/urlSchema";
import { createClient } from "../lib/supabase/supabaseClient/supabaseServerClient";

// The expiration time for non-logged-in users
const EXPIRATION_TIME_HOURS = 1;

export async function deleteExpiredUrls() {
	const expirationTime = new Date();
	const supabase = await createClient();

	// URLs more than 1 hour old
	expirationTime.setHours(expirationTime.getHours() - EXPIRATION_TIME_HOURS);

	// Remove URLs that are not associated with authenticated users and have expired
	const { data, error } = await supabase
		.from("urls")
		.delete()
		.eq("isAuthenticated", false)
		.lt("createdAt", expirationTime.toISOString())
		.select();

	if (error) {
		console.error("Error deleting expired URLs:", error.message);
		return;
	}

	console.debug(`Deleted ${data.length} expired URLs.`);
}

export async function findByUrlCode(urlCode: string) {
	const supabase = await createClient();
	return await supabase.from("urls").select().eq("urlCode", urlCode).select();
}

export async function findByOriginalUrl(originalUrl: string) {
	const supabase = await createClient();
	return await supabase.from("urls").select().eq("originalUrl", originalUrl);
}

export async function insertNewShortUrl(urlSchema: UrlSchema) {
	const { originalUrl, shortUrl, urlCode } = urlSchema;
	const supabase = await createClient();

	return await supabase
		.from("urls")
		.insert({
			originalUrl: originalUrl,
			shortUrl: shortUrl,
			urlCode: urlCode,
		})
		.select();
}
