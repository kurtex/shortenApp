import { deleteExpiredUrls } from "@/app/serverActions/urlActions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const authHeader = request.headers.get("Authorization");

	if (!authHeader) {
		return NextResponse.json({ error: "Server Error" }, { status: 500 });
	}

	const token = authHeader.split(" ")[1];

	if (!token || token !== process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		return await deleteExpiredUrls(token);
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
