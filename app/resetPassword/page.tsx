'use server';

import { resetPasswordForEmail } from "../services/userSvc";

export default async function ResetPassword () {

    return (
        <div>
            <h1>Reset Password</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name='email'
                    required
                />
                <button formAction={resetPasswordForEmail}>Reset Password</button>
            </form>
        </div>
    );
}