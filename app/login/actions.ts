"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/supabaseClient/supabaseServerClient";

export async function login(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signUp(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

export async function signOut() {
	const supabase = await createClient();

	await supabase.auth.signOut();

	revalidatePath("/", "layout");
	redirect("/login");
}

// import axios from "axios";

// export async function login(formData: FormData) {
// 	await axios.post("/api/signIn", {
// 		email: formData.get("email") as string,
// 		password: formData.get("password") as string,
// 	});
// }

// export async function signUp(formData: FormData) {
// 	await axios.post("/api/signUp", {
// 		email: formData.get("email") as string,
// 		password: formData.get("password") as string,
// 	});
// }

// export async function signOut() {
// 	await axios.post("/api/signOut");
// }
