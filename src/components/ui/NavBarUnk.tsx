'use client';

import { MEMBERS } from '@/data';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

export default function NavBarUNK() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    const isActive = (href: string) =>
        href === '/'
            ? pathname === '/'
            : pathname === href || pathname.startsWith(href + '/');

    // Cierra con Escape
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
    };

    return (
        <nav className="nav" aria-label="Main">
            <Link href="/" className="logo">
                UNK
            </Link>

            <ul className="menu">
                <li className={isActive('/') ? 'active' : undefined}>
                    <Link href="/">Home</Link>
                </li>

                <li
                    ref={dropdownRef}
                    className={`${'dropdown'} ${isActive('/integrantes') ? 'active' : ''}`}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    onKeyDown={onKeyDown}
                >
                    <button
                        className="trigger"
                        aria-haspopup="menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        Integrantes
                        <span className="caret" aria-hidden>
                            ▾
                        </span>
                    </button>

                    <ul
                        className={`${'dropdownMenu'} ${open ? '    show' : ''}`}
                        role="menu"
                    >
                        {MEMBERS.map((m) => (
                            <li key={m.slug} role="none">
                                <Link role="menuitem" href={`${m.slug}`}>
                                    {m.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    );
}
