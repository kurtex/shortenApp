import FormWrapper from "@/app/components/FormWrapper";
import { updateUserPassword } from "@/app/serverActions/userActions";


export default async function UpdatePassword () {

    return (
        <FormWrapper title="Update Password">
            <form className="space-y-4">
                <label htmlFor="password" className="standard-label">Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    name='newPassword'
                    className="standard-input"
                    placeholder="Add the new password"
                    required
                />
                <button formAction={updateUserPassword} className="standard-button">Update Password</button>
            </form>
        </FormWrapper>);
}