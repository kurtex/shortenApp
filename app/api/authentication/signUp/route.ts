import { signUp } from "@/app/serverActions/userActions";
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

	if (!user || Object.keys(user.user_metadata).length === 0) {
		return NextResponse.json(
			{ error: "Error en el servidor" },
			{ status: 500 }
		);
	}

	return NextResponse.json(user, { status: 200 });
}
