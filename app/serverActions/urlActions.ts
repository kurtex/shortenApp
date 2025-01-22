"use server";

import { NextResponse } from "next/server";
import { UrlSchema } from "../lib/database/models/urls/urlSchema";
import { createClient } from "../lib/supabase/supabaseClient/supabaseServerClient";

// The expiration time for non-logged-in users
const EXPIRATION_TIME_HOURS = 1;

/**
 * Deletes expired URLs from the database.
 *
 * This function removes URLs that are more than a specified number of hours old
 * and are not associated with authenticated users. The expiration time is determined
 * by subtracting the `EXPIRATION_TIME_HOURS` from the current time.
 *
 * The function performs the following steps:
 * 1. Calculates the expiration time.
 * 2. Creates a Supabase client.
 * 3. Fetches the list of URLs associated with authenticated users.
 * 4. Deletes URLs that are older than the expiration time and not in the list of user-associated URLs.
 *
 * If an error occurs during the fetching or deletion process, it logs the error to the console.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function deleteExpiredUrls(token: string) {
	const expirationTime = new Date();
	const supabase = await createClient(token);

	// URLs more than 1 hour old
	expirationTime.setHours(expirationTime.getHours() - EXPIRATION_TIME_HOURS);

	const { data: userUrlsData, error: userUrlsError } = await supabase
		.from("usersUrls")
		.select("urlId");

	if (userUrlsError) {
		throw new Error(`Error fetching user URLs: ${userUrlsError.message}`);
	}

	const userUrlIds = userUrlsData.map((userUrl) => userUrl.urlId);

	// Remove URLs that are not associated with authenticated users and have expired
	const { data, error } = await supabase
		.from("urls")
		.delete()
		.lt("createdAt", expirationTime.toISOString())
		.not("id", "in", `(${userUrlIds.join(",")})`)
		.select();

	if (error) {
		throw new Error(`Error deleting expired URLs: ${error.message}`);
	}

	return NextResponse.json({
		message: `Deleted ${data.length} expired URLs`,
		status: 200,
	});
}

/**
 * Finds a URL entry in the database by its URL code.
 *
 * @param urlCode - The unique code associated with the URL.
 * @returns A promise that resolves to the result of the database query.
 */
export async function findByUrlCode(urlCode: string) {
	const supabase = await createClient();
	return await supabase.from("urls").select().eq("urlCode", urlCode).select();
}

/**
 * Finds a URL entry in the database by its original URL.
 *
 * @param {string} originalUrl - The original URL to search for.
 * @returns {Promise<any>} A promise that resolves to the result of the query.
 */
export async function findByOriginalUrl(originalUrl: string) {
	const supabase = await createClient();
	return await supabase.from("urls").select().eq("originalUrl", originalUrl);
}

/**
 * Adds a new short URL into the database.
 *
 * @param {UrlSchema} urlSchema - The schema containing the original URL, short URL, and URL code.
 * @returns {Promise<any>} A promise that resolves to the result of the insert operation.
 */
export async function addNewShortUrl(urlSchema: UrlSchema) {
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

/**
 * Assigns a URL to an authenticated user.
 *
 * @param urlId The ID of the URL to assign.
 * @param userUuid The ID of the authenticated user.
 * @returns The result of the insert operation.
 */
export async function assignUrlToAuthenticatedUser(
	urlId: number,
	userUuid: string
) {
	const supabase = await createClient();

	return await supabase
		.from("usersUrls")
		.insert([{ userUuid, urlId }])
		.select();
}
