'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from '../page.module.scss';

const subscribe = () => () => {};

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    // false en el servidor y en la hidratación, true después en el cliente.
    // El tema solo se conoce en el cliente, así que hasta entonces se pinta un hueco.
    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    );

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
