"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LoginLink = () => {
    const pathname = usePathname();
    return (
        <Link className={`link ${pathname !== '/login' ? 'active' : ''}`}
            href={pathname !== '/login' ? "/login" : ''}
            hidden={pathname === '/login'}>Login</Link>
    );
};

export default LoginLink;