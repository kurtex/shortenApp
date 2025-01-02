import { signUp } from "@/app/services/userSvc";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { email, password, passwordConfirmation } = await request.json();

	const formData = new FormData();
	formData.append("email", email);
	formData.append("password", password);
	formData.append("passwordConfirmation", passwordConfirmation);

	const { user, error } = await signUp(formData);

	if (error) {
		return NextResponse.json(error.message, { status: error.status });
	}

	return NextResponse.json(user, { status: 200 });
}
