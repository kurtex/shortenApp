import { createClient } from "../lib/supabase/supabaseClient/supabaseServerClient";
import { login, signOut, signUp } from "./actions";


export default async function Login () {

    const getUser = async () => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        return user;
    };

    const user = await getUser();

    if (!user) {
        return (
            <div className="flex flex-col gap-4">
                <h1>Welcome</h1>
                <div className="flex flex-col border">
                    <p>Create a new account or login</p>
                    <form>
                        <label htmlFor="email">Email:</label>
                        <input name="email" type="email" required />
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" required />
                        <button formAction={signUp}>Sign up</button>
                        <button formAction={login}>Log in</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <form>
            <p>Hello {user.email}</p>
            <button formAction={signOut}>Sign out</button>
        </form>);
}
