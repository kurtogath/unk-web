import { getStaff } from '@/app/lib/staff';
import type { StaffMember } from '@/app/types';
import Image from 'next/image';
import styles from './page.module.scss';

// Se genera en cada visita, con los datos de la BBDD en ese momento.
export const dynamic = 'force-dynamic';

// Si la BBDD falla, la Home se muestra igual, solo que sin la sección de staff.
async function loadStaff(): Promise<StaffMember[]> {
    try {
        return await getStaff();
    } catch (error) {
        console.error('Error obteniendo el staff de la BBDD:', error);
        return [];
    }
}

export default async function Home() {
    const staffMembers = await loadStaff();

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

            {/* Staff Section (oculta si no hay staff o la BBDD ha fallado) */}
            {staffMembers.length > 0 && (
                <div className={styles.staffSection}>
                    <p className={styles.signedBy}>Signed by</p>
                    <div className={styles.staffGrid}>
                        {staffMembers.map((member) => (
                            <a
                                key={member.id}
                                href={member.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.staffLink}
                                aria-label={`Instagram de ${member.name}`}
                                title={member.name}
                            >
                                {member.avatar ? (
                                    <Image
                                        src={member.avatar}
                                        alt={member.name}
                                        width={80}
                                        height={80}
                                        className={styles.staffAvatar}
                                    />
                                ) : (
                                    // Sin foto: círculo con la inicial, mismo tamaño que el avatar
                                    <span
                                        className={`${styles.staffAvatar} ${styles.staffInitial}`}
                                        aria-hidden="true"
                                    >
                                        {member.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
