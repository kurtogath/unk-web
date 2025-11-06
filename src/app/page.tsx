import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
    const staffMembers = [
        {
            name: 'Dario',
            image: '/dario.png',
            link: 'https://www.instagram.com/darioxgd/',
        },
        {
            name: 'Kurto',
            image: '/kurto.png',
            link: 'https://www.instagram.com/kurtogath/',
        },
        {
            name: 'Tresillo',
            image: '/tresillo.png',
            link: 'https://www.instagram.com/tresilloo/',
        },
    ];

    return (
        <main className={styles.container}>
            {/* Notch */}
            <div className={styles.notchContainer}>
                <Image
                    src="/notchSuperior.png"
                    alt="Notch"
                    width={800}
                    height={100}
                    className={styles.notch}
                    priority
                />
                <a
                    href="https://discord.com/invite/HFvzdY9YwT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.discordLink}
                >
                    <Image
                        src="/logoDiscord.png"
                        alt="Discord"
                        width={60}
                        height={60}
                        className={styles.discordLogo}
                    />
                </a>
            </div>

            {/* Principal */}
            <div className={styles.logoContainer}>
                <Image
                    src="/logoUnk.png"
                    alt="UNK Corporation"
                    width={400}
                    height={200}
                    className={styles.mainLogo}
                    priority
                />
            </div>

            {/* Staff Section */}
            <div className={styles.staffSection}>
                <p className={styles.signedBy}>Signed by</p>
                <div className={styles.staffGrid}>
                    {staffMembers.map((member) => (
                        <a
                            key={member.name}
                            href={member.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.staffLink}
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={80}
                                height={80}
                                className={styles.staffAvatar}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </main>
    );
}
