import { getNews } from '@/app/lib/news';
import { NewsGrid } from './NewsGrid';
import styles from './page.module.scss';

export default async function Noticias() {
    const { articles, hasMore } = await getNews(1, 12);

    return (
        <main>
            <section className={styles.newsSection}>
                <NewsGrid initialArticles={articles} initialHasMore={hasMore} />
            </section>
        </main>
    );
}
