import type { DropItem, NewsItem, ProjectCard } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import DropsSlider from './components/DropsSlider';
import NewsSlider from './components/NewsSlider';
import ThemeToggle from './components/ThemeToggle';
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

const topCards: ProjectCard[] = [
    {
        id: 1,
        image: '/cards/projects/projectRosalia.png',
        featured: true,
        title: 'Rosalía o la Biblia',
        tilt: 'tilt2',
        link: 'https://rosalia.unkedition.com/',
    },
    { id: 2, image: '/cards/projects/projectLocked.png', locked: true, tilt: 'tilt1', title: '' },
    { id: 3, image: '/cards/projects/projectLocked.png', locked: true, tilt: 'tilt3', title: '' },
    { id: 4, image: '/cards/projects/projectLocked.png', locked: true, tilt: 'tilt4', title: '' },
];

const middleCards: ProjectCard[] = [
    {
        id: 5,
        image: '/cards/projects/projectLocked.png',
        locked: true,
        size: 'mid',
        tilt: 'tilt2',
        title: '',
    },
    {
        id: 6,
        image: '/cards/projects/projectLocked.png',
        locked: true,
        size: 'mid',
        tilt: 'tilt1',
        title: '',
    },
    {
        id: 7,
        image: '/cards/projects/projectLocked.png',
        locked: true,
        size: 'mid',
        tilt: 'tilt3',
        title: '',
    },
    {
        id: 8,
        image: '/cards/projects/projectLocked.png',
        locked: true,
        size: 'mid',
        tilt: 'tilt4',
        title: '',
    },
    {
        id: 9,
        image: '/cards/projects/projectLocked.png',
        locked: true,
        size: 'mid',
        tilt: 'tilt1',
        title: '',
    },
];

const bottomCards: ProjectCard[] = [
    {
        id: 10,
        image: '/cards/projects/projectLocked.png',
        locked: true,
        size: 'bottom',
        tilt: 'tilt1',
        title: '',
    },
    {
        id: 11,
        image: '/cards/projects/projectLocked.png',
        locked: true,
        size: 'bottom',
        tilt: 'tilt2',
        title: '',
    },
    {
        id: 12,
        image: '/cards/projects/projectLocked.png',
        locked: true,
        size: 'bottom',
        tilt: 'tilt3',
        title: '',
    },
    {
        id: 13,
        image: '/cards/projects/projectLocked.png',
        locked: true,
        size: 'bottom',
        tilt: 'tilt4',
        title: '',
    },
];

const newsItems: NewsItem[] = [
    { id: 1, image: '/cards/news/card1.png' },
    { id: 2, image: '/cards/news/card2.png' },
    { id: 3, image: '/cards/news/card3.png' },
    { id: 4, image: '/cards/news/card4.png' },
    { id: 5, image: '/cards/news/card5.png' },
    { id: 6, image: '/cards/news/card6.png' },
    { id: 7, image: '/cards/news/card1.png' },
    { id: 8, image: '/cards/news/card2.png' },
    { id: 9, image: '/cards/news/card3.png' },
    { id: 10, image: '/cards/news/card4.png' },
];

const drops: DropItem[] = [
    {
        id: 1,
        label: 'Rosalia',
        image: '/drops/drop2.png',
        alt: 'RosaliaDrop',
        link: 'https://rosalia.unkedition.com/',
    },
    { id: 2, label: 'UPCOMING', image: '/drops/dropDefault.png', alt: 'Upcoming Drop 1' },
    { id: 3, label: 'UPCOMING', image: '/drops/dropDefault.png', alt: 'Upcoming Drop 2' },
    { id: 4, label: 'UPCOMING', image: '/drops/dropDefault.png', alt: 'Upcoming Drop 3' },
    { id: 5, label: 'UPCOMING', image: '/drops/dropDefault.png', alt: 'Upcoming Drop 4' },
    { id: 6, label: 'UPCOMING', image: '/drops/dropDefault.png', alt: 'Upcoming Drop 5' },
    { id: 7, label: 'UPCOMING', image: '/drops/dropDefault.png', alt: 'Upcoming Drop 6' },
    { id: 8, label: 'UPCOMING', image: '/drops/dropDefault.png', alt: 'Upcoming Drop 7' },
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
                    <a href={card.link} target="_blank" rel="noopener noreferrer">
                        <Image
                            src={card.image}
                            fill
                            alt={card.title}
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
                                alt="YouTube"
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
                                alt="TikTok"
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
                                alt="Discord"
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
                        <ThemeToggle />
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
                        <DropsSlider drops={drops} />
                    </section>

                    <section className={styles.panel} aria-labelledby="news-title">
                        <NewsSlider news={newsItems} />
                    </section>
                </div>

                <div className={styles.centerPill}>WHO YOU THINK YOU ARE, WE ARE</div>

                <section className={styles.wipBox} aria-label="Work in progress">
                    <span>WORK IN PROGRESS...</span>
                </section>

                <div className={styles.floatingStickers} aria-hidden="true">
                    <Image src="/logos/footer.png" alt="FooterLogo" width={220} height={220} />
                </div>
            </section>
        </main>
    );
}
