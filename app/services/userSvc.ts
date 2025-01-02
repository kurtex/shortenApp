"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/supabaseClient/supabaseServerClient";
import { AuthError } from "@supabase/supabase-js";

/**
 * A login function that uses the email and password to authenticate the user.
 *
 * @param formData The data where the email and password are retrieved
 */
export async function login(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const credentials = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	let error;

	if (!credentials.email || !credentials.password) {
		error = new AuthError("Email and password are required.");
		error.status = 400;
	}

	const { data, error: signInError } = await supabase.auth.signInWithPassword(
		credentials
	);

	const user = data?.user;
	error = signInError;

	return { user, error };

	// In Server components, you can use revalidatePath to revalidate the path.
	// revalidatePath("/", "layout");
	// redirect("/");
}

/**
 * Signs up a new user.
 *
 * @param formData The data where the email and password are retrieved
 */
export async function signUp(formData: FormData) {
	const supabase = await createClient();

	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirm-password") as string;

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const credentials = {
		email: formData.get("email") as string,
		password: password,
	};

	let error;

	if (confirmPassword !== password) {
		error = new AuthError("Passwords do not match.");
		error.status = 400;
	}

	const { data, error: signUpError } = await supabase.auth.signUp(credentials);

	if (error) {
		error = signUpError;
	}

	const user = data?.user;

	return { user, error };
}

/**
 * Signs out the current user.
 *
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 *
 * @throws Will redirect to an error page if there is an error during sign-out.
 */
export async function signOut() {
	const supabase = await createClient();

	await supabase.auth.signOut();

	revalidatePath("/", "layout");
	redirect("/");
}

/**
 * Retrieves the current user.
 *
 * @returns {Promise<any>} A promise that resolves with the current user.
 * @throws Will redirect to an error page if there is an error getting the user.
 */
export const getUser = async () => {
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	return { user, error };
};

export async function resetPasswordForEmail(formData: FormData) {
	const email = formData.get("email") as string;

	// validate the email and the format of it
	if (!email || !email.includes("@")) {
		redirect("/error?errorMessage=Invalid email");
	}

	const serverClient = await createClient();
	const { error } = await serverClient.auth.resetPasswordForEmail(email);

	if (error) {
		redirect("/error");
	}

	console.log("Reset password for:", email);

	revalidatePath("/layout");
	redirect("/");
}

export async function updateUserPassword(formData: FormData) {
	const newPassword = formData.get("newPassword") as string;

	// validate the password and make sure it meets the requirements
	if (!newPassword || newPassword.length < 6) {
		redirect("/error?errorMessage=Invalid password");
	}

	const serverClient = await createClient();

	const { error } = await serverClient.auth.updateUser({
		password: newPassword,
	});

	if (error) {
		console.error("Failed to update password:", error.message);
		redirect("/error?errorMessage=Failed to update password");
	}

	// Redirect to the root page
	redirect("/");
}
