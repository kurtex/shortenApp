'use client';

import { useRouter } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Login () {

    const router = useRouter();
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    const isEmpty = (obj: any) => !obj || Object.keys(obj).length === 0;

    useEffect(() => {
        const user = async () => {
            const response = await axios.get('/api/user');

            setUser(response.data);
        };

        user();

    }, []);

    useEffect(() => {
        if (!isEmpty(user)) {
            return router.push('/');
        }

        if (user !== "") {
            setLoading(false);
        }
    }, [user]);

    return (
        <>
            {loading && (<p> Loading...</p >)}
            {!loading && <LoginForm />}
        </>
    );
}
