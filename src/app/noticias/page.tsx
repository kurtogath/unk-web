import Image from 'next/image';
import styles from './page.module.scss';

type Article = {
    id: number;
    image: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    slug: string;
};

const articles: Article[] = [
    {
        id: 1,
        image: '/cards/news/card1.png',
        category: 'ESTUDIO',
        date: '28 ABR 2026',
        title: 'Nueva fase del rediseño completada',
        excerpt: 'El equipo de UNK Edition concluye la primera fase del nuevo diseño visual del portal.',
        slug: 'nueva-fase-rediseno',
    },
    {
        id: 2,
        image: '/cards/news/card2.png',
        category: 'DROPS',
        date: '22 ABR 2026',
        title: 'Próximo drop: detalles y fecha',
        excerpt: 'Se acerca el siguiente lanzamiento de la colección UNK. Todo lo que necesitas saber.',
        slug: 'proximo-drop-detalles',
    },
    {
        id: 3,
        image: '/cards/news/card3.png',
        category: 'COMUNIDAD',
        date: '15 ABR 2026',
        title: 'Apertura del servidor de Discord',
        excerpt: 'La comunidad UNK ya tiene su espacio propio. Únete y forma parte del movimiento.',
        slug: 'apertura-discord',
    },
    {
        id: 4,
        image: '/cards/news/card4.png',
        category: 'PROYECTOS',
        date: '10 ABR 2026',
        title: 'Rosalía o Biblia: más de 10k partidas',
        excerpt: 'Nuestro juego viral sigue creciendo. Repasamos los números y lo que viene.',
        slug: 'rosalia-biblia-10k',
    },
    {
        id: 5,
        image: '/cards/news/card5.png',
        category: 'ESTUDIO',
        date: '04 ABR 2026',
        title: 'Conexión a base de datos en producción',
        excerpt: 'El tablero de proyectos ahora carga datos en tiempo real desde nuestra base de datos.',
        slug: 'bbdd-produccion',
    },
    {
        id: 6,
        image: '/cards/news/card6.png',
        category: 'HERRAMIENTAS',
        date: '28 MAR 2026',
        title: 'Nuevas herramientas digitales en camino',
        excerpt: 'El equipo trabaja en varias utilidades web que estarán disponibles muy pronto.',
        slug: 'nuevas-herramientas',
    },
];

export default function Noticias() {
    return (
        <main>
            <section className={styles.newsSection}>
                <div className={styles.newsSectionHeader}>
                    <span className={styles.sectionTitle}>NOTICIAS</span>
                </div>

                <div className={styles.articlesGrid}>
                    {articles.map((article) => (
                        <article key={article.id} className={styles.articleCard}>
                            <div className={styles.articleImage}>
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.articleBody}>
                                <div className={styles.articleMeta}>
                                    <span className={styles.articleCategory}>{article.category}</span>
                                    <span className={styles.articleDate}>{article.date}</span>
                                </div>
                                <h2 className={styles.articleTitle}>{article.title}</h2>
                                <p className={styles.articleExcerpt}>{article.excerpt}</p>
                                <span className={styles.articleReadMore}>LEER MÁS →</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
