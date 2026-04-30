import { getProjects } from '@/app/api/projects';
import type { DropItem, NewsItem, ProjectCard } from '@/app/types';
import Image from 'next/image';
import DropsSlider from './components/DropsSlider';
import NewsSlider from './components/NewsSlider';
import styles from './page.module.scss';

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

export default async function Home() {
    const projects = await getProjects();

    const topCardsBBDD: ProjectCard[] = projects.filter((p) => !p.size || p.size === 'default');
    const middleCardsBBDD: ProjectCard[] = projects.filter((p) => p.size === 'mid');
    const bottomCardsBBDD: ProjectCard[] = projects.filter((p) => p.size === 'bottom');

    return (
        <main className={styles.page}>
            <section className={styles.boardWrap}>
                <section className={styles.board} id="projects" aria-label="Proyectos destacados">
                    <div className={cx(styles.cardsRow, styles.cardsRowTop)}>
                        {topCardsBBDD.map((card) => (
                            <NoteCard key={card.id} card={card} />
                        ))}
                    </div>

                    <div className={cx(styles.cardsRow, styles.cardsRowMid)}>
                        {middleCardsBBDD.map((card) => (
                            <NoteCard key={card.id} card={card} />
                        ))}
                    </div>

                    <div className={cx(styles.cardsRow, styles.cardsRowBottom)}>
                        {bottomCardsBBDD.map((card) => (
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
