import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

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
        link: 'https://www.instagram.com/tresilllo/',
    },
];

type ProjectCard = {
    id: number;
    locked?: boolean;
    featured?: boolean;
    title?: string;
    timer?: string;
    size?: 'default' | 'mid' | 'bottom';
    tilt: 'tilt1' | 'tilt2' | 'tilt3' | 'tilt4';
};

type DropItem = {
    id: number;
    label: string;
    variant: 'lock' | 'skull' | 'ring';
};

const topCards: ProjectCard[] = [
    { id: 1, featured: true, title: 'Rosalía o la Biblia', tilt: 'tilt2' },
    { id: 2, locked: true, tilt: 'tilt1' },
    { id: 3, locked: true, tilt: 'tilt3' },
    { id: 4, locked: true, tilt: 'tilt4' },
];

const middleCards: ProjectCard[] = [
    { id: 5, locked: true, size: 'mid', tilt: 'tilt2' },
    { id: 6, locked: true, size: 'mid', tilt: 'tilt1' },
    { id: 7, locked: true, size: 'mid', tilt: 'tilt3' },
    { id: 8, locked: true, size: 'mid', tilt: 'tilt4' },
    { id: 9, locked: true, size: 'mid', tilt: 'tilt1' },
];

const bottomCards: ProjectCard[] = [
    { id: 10, locked: true, size: 'bottom', tilt: 'tilt1' },
    { id: 11, locked: true, size: 'bottom', tilt: 'tilt2' },
    { id: 12, locked: true, size: 'bottom', tilt: 'tilt3' },
    { id: 13, locked: true, size: 'bottom', tilt: 'tilt4' },
];

const drops: DropItem[] = [
    { id: 1, label: 'UPCOMING', variant: 'lock' },
    { id: 2, label: 'UPCOMING', variant: 'lock' },
    { id: 3, label: '26.11', variant: 'skull' },
    { id: 4, label: '7.11', variant: 'ring' },
];

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function NoteCard({ card }: { card: ProjectCard }) {
    return (
        <article
            className={cx(
                styles.noteCard,
                card.size === 'mid' && styles.noteCardMid,
                card.size === 'bottom' && styles.noteCardBottom,
                card.featured && styles.noteCardFeatured,
                styles[card.tilt]
            )}
        >
            <span className={styles.pin} aria-hidden="true" />

            {card.featured ? (
                <div className={styles.featuredCard}>
                    <a
                        href="https://rosalia.unkedition.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/cards/projects/projectRosalia.png"
                            fill
                            alt="ProjectLocked"
                            style={{ objectFit: 'cover' }}
                        />
                    </a>
                </div>
            ) : (
                <div className={styles.lock} aria-label="Contenido bloqueado">
                    <Image
                        src="/cards/projects/projectLocked.png"
                        fill
                        alt="ProjectLocked"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            )}
        </article>
    );
}

function DropThumb({ variant }: { variant: DropItem['variant'] }) {
    if (variant === 'skull') {
        return <span className={styles.thumbAlt}>☠</span>;
    }

    if (variant === 'ring') {
        return <span className={styles.thumbAlt}>◍</span>;
    }

    return <span className={styles.thumbLock}>🔒</span>;
}

export default function Home() {
    return (
        <main className={styles.page}>
            <section className={styles.heroSection} id="top">
                <header className={styles.header}>
                    <div className={styles.socials} aria-label="Redes sociales">
                        <a
                            href="https://www.instagram.com/unkedition"
                            aria-label="Instagram"
                            className={styles.iconBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src={'/socialIcons/ig_icon.png'}
                                alt="Instagram"
                                width={38}
                                height={30}
                            />
                        </a>
                        <a
                            href="https://www.youtube.com/@unkedition"
                            aria-label="YouTube"
                            className={styles.iconBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src={'/socialIcons/yt_icon.png'}
                                alt="Instagram"
                                width={38}
                                height={30}
                            />
                        </a>
                        <a
                            href="https://www.tiktok.com/@unked"
                            aria-label="TikTok"
                            className={styles.iconBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src={'/socialIcons/tt_icon.png'}
                                alt="Instagram"
                                width={38}
                                height={30}
                            />
                        </a>
                        <a
                            href="https://discord.com/invite/HFvzdY9YwT"
                            aria-label="Discord"
                            className={styles.iconBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src={'/socialIcons/dc_icon.png'}
                                alt="Instagram"
                                width={38}
                                height={30}
                            />
                        </a>
                    </div>

                    <div className={styles.logoMark} aria-hidden="true">
                        <Link href="/">
                            <Image src={'/logos/unkLogo.png'} alt="Logo" width={250} height={100} />
                        </Link>
                    </div>

                    <div className={styles.brand}>
                        <Image
                            src={'/logos/PSY-OP.png'}
                            alt="PsyOP-Logo"
                            width={180}
                            height={100}
                        />
                    </div>
                </header>

                <nav className={styles.menuPillWrap} aria-label="Navegación principal">
                    <Link href="/tv" className={cx(styles.menuPill, styles.menuPillSmall)}>
                        NEWS
                    </Link>

                    <Link href="/tv" className={cx(styles.menuPill, styles.menuPillSmall)}>
                        RECORDS
                    </Link>

                    <Link href="/" className={cx(styles.menuPill, styles.menuPillSmall)}>
                        HOME OF THE UNKLASSIFIABLE
                    </Link>

                    <Link href="/tv" className={cx(styles.menuPill, styles.menuPillSmall)}>
                        TOOLS
                    </Link>

                    <Link href="/tv" className={cx(styles.menuPill, styles.menuPillSmall)}>
                        SHOP
                    </Link>
                </nav>

                <section className={styles.board} id="projects" aria-label="Proyectos destacados">
                    <div className={cx(styles.cardsRow, styles.cardsRowTop)}>
                        {topCards.map((card) => (
                            <NoteCard key={card.id} card={card} />
                        ))}
                    </div>

                    <div className={cx(styles.cardsRow, styles.cardsRowMid)}>
                        {middleCards.map((card) => (
                            <NoteCard key={card.id} card={card} />
                        ))}
                    </div>

                    <div className={cx(styles.cardsRow, styles.cardsRowBottom)}>
                        {bottomCards.map((card) => (
                            <NoteCard key={card.id} card={card} />
                        ))}
                    </div>
                </section>
            </section>

            <section className={styles.contentSection} id="drops">
                <div className={styles.columns}>
                    <section className={styles.panel} aria-labelledby="drops-title">
                        <h2 className={styles.sectionTitle} id="drops-title">
                            DROPS
                        </h2>

                        <div className={styles.dropsRow}>
                            <button type="button" className={styles.navArrow} aria-label="Anterior">
                                ‹
                            </button>

                            {drops.map((item) => (
                                <article key={item.id} className={styles.dropItem}>
                                    <div className={styles.dropThumb}>
                                        <DropThumb variant={item.variant} />
                                    </div>
                                    <span>{item.label}</span>
                                </article>
                            ))}

                            <button
                                type="button"
                                className={styles.navArrow}
                                aria-label="Siguiente"
                            >
                                ›
                            </button>
                        </div>
                    </section>

                    <section className={styles.panel} aria-labelledby="news-title">
                        <h2 className={styles.sectionTitle} id="news-title">
                            NEWS
                        </h2>

                        <div className={styles.newsGrid}>
                            <article className={styles.newsCard} />
                            <article className={styles.newsCard} />
                            <article className={cx(styles.newsCard, styles.hiddenMobile)} />
                        </div>
                    </section>
                </div>

                <div className={styles.centerPill}>WHO YOU THINK YOU ARE, WE ARE</div>

                <section className={styles.wipBox} aria-label="Work in progress">
                    <span>WORK IN PROGRESS...</span>
                </section>

                <div className={styles.floatingStickers} aria-hidden="true">
                    <span>▣</span>
                    <span>▤</span>
                    <span>◫</span>
                </div>
            </section>
        </main>
    );
}
