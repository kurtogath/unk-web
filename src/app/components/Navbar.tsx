'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.scss';

const navLinks = [
    { href: '/noticias', label: 'NEWS' },
    { href: '/records', label: 'RECORDS' },
    { href: '/', label: 'HOME OF THE UNKLASSIFIABLE', exact: true },
    { href: '/tools', label: 'TOOLS' },
    { href: '/shop', label: 'SHOP' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className={styles.navWrapper}>
            <header className={styles.header}>
                <div className={styles.socials} aria-label="Redes sociales">
                    <a href="https://www.instagram.com/unkedition" aria-label="Instagram" className={styles.iconBtn} target="_blank" rel="noopener noreferrer">
                        <Image src="/socialIcons/ig_icon.png" alt="Instagram" width={38} height={30} />
                    </a>
                    <a href="https://www.youtube.com/@unkedition" aria-label="YouTube" className={styles.iconBtn} target="_blank" rel="noopener noreferrer">
                        <Image src="/socialIcons/yt_icon.png" alt="YouTube" width={38} height={30} />
                    </a>
                    <a href="https://www.tiktok.com/@unked" aria-label="TikTok" className={styles.iconBtn} target="_blank" rel="noopener noreferrer">
                        <Image src="/socialIcons/tt_icon.png" alt="TikTok" width={38} height={30} />
                    </a>
                    <a href="https://discord.com/invite/HFvzdY9YwT" aria-label="Discord" className={styles.iconBtn} target="_blank" rel="noopener noreferrer">
                        <Image src="/socialIcons/dc_icon.png" alt="Discord" width={38} height={30} />
                    </a>
                </div>

                <div className={styles.logoMark}>
                    <Link href="/">
                        <Image src="/logos/unkLogo.png" alt="Logo" width={250} height={100} />
                    </Link>
                </div>

                <div className={styles.brand}>
                    <ThemeToggle />
                    <Image src="/logos/PSY-OP.png" alt="PsyOP-Logo" width={180} height={100} />
                </div>
            </header>

            <nav className={styles.menuPillWrap} aria-label="Navegación principal">
                {navLinks.map(({ href, label, exact }) => {
                    const isActive = exact ? pathname === href : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={[
                                styles.menuPill,
                                styles.menuPillSmall,
                                isActive ? styles.menuPillActive : '',
                            ].join(' ')}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
