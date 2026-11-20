'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { NewsArticle } from '@/app/types';
import styles from './page.module.scss';

const LIMIT = 12;

function ArticleCard({ article }: { article: NewsArticle }) {
    return (
        <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.articleCard}
        >
            <div className={styles.articleImage}>
                {article.image && (
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                )}
            </div>
            <div className={styles.articleBody}>
                <div className={styles.articleMeta}>
                    {article.category && (
                        <span className={styles.articleCategory}>{article.category}</span>
                    )}
                    <span className={styles.articleDate}>{article.publishedAt}</span>
                </div>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                {article.subtitle && (
                    <p className={styles.articleSubtitle}>{article.subtitle}</p>
                )}
                <p className={styles.articleExcerpt}>{article.excerpt}</p>
                <span className={styles.articleReadMore}>VER EN INSTAGRAM →</span>
            </div>
        </Link>
    );
}

export function NewsGrid({
    initialArticles,
    initialHasMore,
}: {
    initialArticles: NewsArticle[];
    initialHasMore: boolean;
}) {
    const [articles, setArticles] = useState(initialArticles);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        setError(false);
        const nextPage = page + 1;
        try {
            const res = await fetch(`/api/news-feed?page=${nextPage}&limit=${LIMIT}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data: { articles: NewsArticle[]; hasMore: boolean } = await res.json();
            // La primera página puede venir de caché (revalidate), así que si se
            // publicó algo entretanto el offset se desplaza: evitamos duplicados.
            setArticles((prev) => {
                const seen = new Set(prev.map((a) => a.id));
                return [...prev, ...data.articles.filter((a) => !seen.has(a.id))];
            });
            setHasMore(data.hasMore);
            setPage(nextPage);
        } catch (err) {
            console.error('Error cargando más noticias:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, page]);

    useEffect(() => {
        // Tras un error no reintentamos solos (evita un bucle de peticiones):
        // el usuario reintenta con el botón.
        if (error) return;
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) loadMore(); },
            { rootMargin: '300px' }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore, error]);

    return (
        <>
            <div className={styles.articlesGrid}>
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
            <div ref={sentinelRef} />
            {loading && (
                <div className={styles.loadingSpinner}>
                    <span /><span /><span />
                </div>
            )}
            {error && !loading && (
                <div className={styles.loadError}>
                    <p>No se pudieron cargar más noticias.</p>
                    <button type="button" onClick={loadMore}>
                        Reintentar
                    </button>
                </div>
            )}
        </>
    );
}
