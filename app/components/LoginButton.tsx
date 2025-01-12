import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { getUser } from "../serverActions/userActions";
import { useEffect } from "react";

interface LogginButtonProps {
    pathname: string;
}

export async function LoginButton ({ pathname }: LogginButtonProps) {

    useEffect(() => {

    }, []);
    const user = await getUser();

    return (
        <>{user === null ? (
            <Link className={`link ${pathname !== '/login' ? 'active' : ''}`}
                href={pathname !== '/login' ? "/login" : ''}
                hidden={pathname === '/login'}>Login</Link>) : <SignOutButton />
        }</>
    );
}





