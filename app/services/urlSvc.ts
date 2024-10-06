import { connectDB } from "../lib/dbConnection";
import { Url } from "../models/urlSchema";

// The expiration time for non-logged-in users
const EXPIRATION_TIME_HOURS = 1;

export async function deleteExpiredUrls() {
	try {
		await connectDB();

		const expirationTime = new Date();

		// URLs more than 1 hour old
		expirationTime.setHours(expirationTime.getHours() - EXPIRATION_TIME_HOURS);

		// Remove URLs that are not associated with authenticated users and have expired
		const result = await Url.deleteMany({
			isAuthenticated: false,
			createdAt: { $lt: expirationTime }, // Only URLs that have been created more than 1 hour ago
		});

		console.log(`Deleted ${result.deletedCount} expired URLs.`);
	} catch (error) {
		console.error("Error deleting expired URLs:", error);
	}
}
