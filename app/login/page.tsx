'use client';

import { useRouter } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { useEffect, useState } from "react";
import useRedirectUserLogged from "../customHooks/useRedirectUserLogged";


export default function Login () {

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useRedirectUserLogged(router);

    useEffect(() => {

        setLoading(false);

    }, []);

    return (
        <>
            {loading && (<p> Loading...</p >)}
            {!loading && <LoginForm />}
        </>
    );
}
