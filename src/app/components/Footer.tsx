import styles from './Footer.module.scss';

const staff = [
    { name: 'Kurto', link: 'https://www.instagram.com/kurtogath/' },
    { name: 'Dario', link: 'https://www.instagram.com/darioxgd/' },
    { name: 'Tresillo', link: 'https://www.instagram.com/tresilllo/' },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <span className={styles.copy}>© {new Date().getFullYear()} UNK EDITION</span>
                <nav className={styles.staff} aria-label="Equipo">
                    {staff.map(({ name, link }) => (
                        <a
                            key={name}
                            href={link}
                            className={styles.staffLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {name}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
