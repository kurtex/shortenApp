'use server';

import FormWrapper from "../components/FormWrapper";
import { resetPasswordForEmail } from "../services/userSvc";

export default async function ResetPassword () {

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