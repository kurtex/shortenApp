import { updateUserPassword } from "@/app/services/userSvc";


export default async function UpdatePassword () {

    return (<div>
        <h1>Update Password</h1>
        <form>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="newPassword"
                name='newPassword'
                required
            />
            <button formAction={updateUserPassword}>Update Password</button>
        </form>
    </div>);
}