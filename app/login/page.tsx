import { LoginForm } from "../components/LoginForm";
import { getUser, signOut } from "./actions";
import SignUp from "../components/SignUpForm";

interface LoginPageProps {
    searchParams: Record<string, string | string[]>;
}

export default async function Login ({ searchParams }: LoginPageProps) {

    const type = searchParams['type'];
    const user = await getUser();

    if (!user) {
        return (
            <div className="flex align-middle justify-center h-screen">
                {type === 'signUp' ? (<SignUp />) : (<LoginForm />)}
            </div>
        );
    }

    return (
        <form>
            <p>Hello {user.email}</p>
            <button formAction={signOut}>Sign out</button>
        </form>);
}
