import { deleteExpiredUrls } from "@/app/serverActions/urlActions";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		return await deleteExpiredUrls();
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error deleting expired URLs:", error.message);
		} else {
			console.error("Error deleting expired URLs:", error);
		}

		return NextResponse.json(
			{ error: "Error deleting expired URLs" },
			{ status: 500 }
		);
	}
}
