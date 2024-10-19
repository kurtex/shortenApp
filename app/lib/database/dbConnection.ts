import { createClient } from "@supabase/supabase-js";

export const connectToSupabaseDb = () => {
	// Create a single supabase client for interacting with your database
	return createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
	);
};
