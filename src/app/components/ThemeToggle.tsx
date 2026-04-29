'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from '../page.module.scss';

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <span className={styles.themeToggle} aria-hidden />;

    return (
        <button
            type="button"
            className={styles.themeToggle}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="Cambiar tema"
        >
            {resolvedTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
    );
}
