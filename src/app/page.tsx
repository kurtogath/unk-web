import { getStaff } from '@/app/lib/staff';
import type { StaffMember } from '@/app/types';
import Image from 'next/image';
import styles from './page.module.scss';

// Se genera en cada visita, con los datos del CRM en ese momento.
export const dynamic = 'force-dynamic';

// Si el CRM falla, la Home se muestra igual, solo que sin la sección de staff.
async function loadStaff(): Promise<StaffMember[]> {
    try {
        return await getStaff();
    } catch (error) {
        console.error('Error obteniendo el staff del CRM:', error);
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

            {/* Staff Section (oculta si nadie firma o el CRM ha fallado) */}
            {staffMembers.length > 0 && (
                <div className={styles.staffSection}>
                    <p className={styles.signedBy}>Signed by</p>
                    <div className={styles.staffGrid}>
                        {staffMembers.map((member) => {
                            const label = member.instagram
                                ? `@${member.instagram}`
                                : 'Miembro de UNK';
                            const avatar = (
                                <Image
                                    src={member.avatar ?? '/avatar-generico.svg'}
                                    alt={label}
                                    width={100}
                                    height={100}
                                    className={styles.staffAvatar}
                                    unoptimized={!member.avatar} // el SVG no pasa por el optimizador de imágenes
                                />
                            );

                            // Sin Instagram: la foto sin enlace
                            return member.instagramUrl ? (
                                <a
                                    key={member.id}
                                    href={member.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.staffLink}
                                    aria-label={`Instagram de ${label}`}
                                    title={label}
                                >
                                    {avatar}
                                </a>
                            ) : (
                                <span key={member.id} className={styles.staffLink} title={label}>
                                    {avatar}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </main>
    );
}
