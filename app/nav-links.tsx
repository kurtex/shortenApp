'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLinks () {
    const pathname = usePathname();

    return (
        <nav className='flex flex-row items-end justify-between gap-4 p-3 font-semibold'>
            <Link className={`link ${pathname === '/' ? 'active' : ''}`}
                href="/">Home</Link>

            <Link className={`link ${pathname === '/login' ? 'active' : ''}`}
                href="/login">Login</Link>
        </nav>
    )
}