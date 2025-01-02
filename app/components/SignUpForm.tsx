'use client';

import { FormEvent, useState } from "react";
import { AuthForm, FormType } from "./AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUpForm = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const email = formData.get("email");
        const password = formData.get("password");
        const passwordConfirmation = formData.get("confirm-password");

        try {
            const response = await axios.post("/api/authentication/signUp", { email, password, passwordConfirmation });
            if (response.status === 200) {
                router.push("/");
                // This ensures that the nav-links are updated
                router.refresh();
            }

        } catch (error: unknown) {
            const errorMessage = error.response.data.error;
            setErrorMessage(errorMessage);
        }
    };

    return (
        <AuthForm title="Create an account" type={FormType.SIGN_UP} submitAction={handleSignUp} errorMessage={errorMessage} />
    );
};

export default SignUpForm;