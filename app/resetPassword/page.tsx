'use server';


import { redirect } from "next/navigation";
import FormWrapper from "../components/FormWrapper";
import { getUser, resetPasswordForEmail } from "../serverActions/userActions";

export default async function ResetPassword () {

    if (getUser() !== null) {
        redirect('/');
    }

    return (
        <FormWrapper title="Reset Password">
            <form className="space-y-4">
                <label htmlFor="email" className="standard-label">Email:</label>
                <input
                    type="email"
                    id="email"
                    name='email'
                    className="standard-input"
                    placeholder="Add your email"
                    required
                />
                <button formAction={resetPasswordForEmail} className="standard-button">Reset Password</button>
            </form>
        </FormWrapper>
    );
}