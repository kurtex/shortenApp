import { login } from "@/app/serverActions/userActions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { email, password } = await request.json();

	const formData = new FormData();
	formData.append("email", email);
	formData.append("password", password);

	const { user, error } = await login(formData);

	if (error) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status }
		);
	}

	return NextResponse.json(user, { status: 200 });
}
