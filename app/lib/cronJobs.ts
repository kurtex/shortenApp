import cron from "node-cron";
import { deleteExpiredUrls } from "../services/urlSvc";

// Create a cron job that runs every hour
cron.schedule("0 * * * *", async () => {
	console.log("Running cron job to delete expired URLs...");
	await deleteExpiredUrls();
});
