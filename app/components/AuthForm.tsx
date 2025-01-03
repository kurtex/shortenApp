import { FormEvent } from "react";
import SignUpFormFields from "./SignUpFormFields";
import SignInFields from "./SignInFields";
import HaveAccountLink from "./HaveAccountLink";

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
        <div className="flex align-middle justify-center h-screen">
            <section className="rounded-lg flex flex-col justify-center items-center">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {title}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={submitAction}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            {isSignUp() ? <SignUpFormFields /> : <SignInFields />}
                            <button type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                            focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                            dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-primary-800">
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
                    </div>
                </div>
            </section>
        </div>
    );
}