'use client';

import { FormEvent, useState } from "react";
import { AuthForm, FormType } from "./AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const response = await axios.post("/api/authentication/login", { email, password });
            if (response.status === 200) {
                router.push("/");
                // This ensures that the nav-links are updated
                router.refresh();
            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.error;
                console.error("Error logando al usuario", errorMessage);
                setErrorMessage(errorMessage);
            } else {
                console.error("Unexpected error", error);
            }
        }
    };

    return (
        <AuthForm title="Sign in to your account" type={FormType.LOGIN} submitAction={handleLogin} errorMessage={errorMessage} />
    );
};

export default LoginForm;