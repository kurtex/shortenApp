"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeLink = () => {

    const pathname = usePathname();

    return (
        <Link className={`link ${pathname === '/' ? 'active' : ''}`}
            href="/">Home</Link>
    );
};

export default HomeLink;