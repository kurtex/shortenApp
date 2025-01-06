import { FormEvent } from "react";
import SignUpFormFields from "./SignUpFormFields";
import SignInFields from "./SignInFields";
import HaveAccountLink from "./HaveAccountLink";
import FormWrapper from "./FormWrapper";

/**
 * The type of form to render.
 */
export enum FormType {
    SIGN_UP = "signUp",
    LOGIN = "login"
}

interface AuthFormProps {
    type: FormType;
    title: string;
    submitAction: (e: FormEvent) => void;
    errorMessage?: string | null;

}

export function AuthForm ({ type, title, submitAction, errorMessage }: AuthFormProps) {

    /**
     * Check if the form is a sign-up form.
     * 
     * @returns {boolean} True if the form is a sign-up form, false otherwise.
     */
    const isSignUp = (): boolean => type === FormType.SIGN_UP;

    return (
        <FormWrapper title={title}>
            <form className="space-y-4 md:space-y-6" onSubmit={submitAction}>
                <div>
                    <label htmlFor="email" className="standard-label">Your email</label>
                    <input type="email" name="email" id="email" className="standard-input" placeholder="name@company.com" required />
                </div>
                <div>
                    <label htmlFor="password" className="standard-label">Password</label>
                    <input type="password" name="password" id="password" placeholder="password" className="standard-input" required />
                </div>
                {isSignUp() ? <SignUpFormFields /> : <SignInFields />}
                <button type="submit"
                    className="standard-button">
                    {isSignUp() ? "Create new account" : "Sign in"}
                </button>
                {errorMessage && (
                    <p className="text-red-800">{errorMessage}</p>
                )}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {isSignUp() ? (
                        <HaveAccountLink question="Already have an account?" linkText="Login here" linkUrl="/login" />
                    ) : (
                        <HaveAccountLink question="Don't have an account yet?" linkText="Sign up" linkUrl="/signUp" />
                    )}
                </p>
            </form>
        </FormWrapper>
    );
}