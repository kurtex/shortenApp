import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState, useEffect } from "react";

export default function useRedirectUserLogged(router: AppRouterInstance) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get("/api/user");
			setUser(response.data);
		};

		fetchUser();
	}, []);

	useEffect(() => {
		if (user && Object.keys(user).length > 0) {
			router.push("/");
		}
	}, [user, router]);
}
