import { getUser } from "@/app/serverActions/userActions";
import { NextResponse } from "next/server";

export async function GET() {
	const { user } = await getUser();

	return NextResponse.json({ email: user?.email }, { status: 200 });
}
