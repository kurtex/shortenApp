import { getUser } from "@/app/login/actions";
import { NextResponse } from "next/server";

export async function GET() {
	const data = await getUser();

	return NextResponse.json({ email: data?.email }, { status: 200 });
}
