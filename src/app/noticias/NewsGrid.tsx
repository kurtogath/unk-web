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
    const sentinelRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const nextPage = page + 1;
        const res = await fetch(`/api/news-feed?page=${nextPage}&limit=${LIMIT}`);
        const data: { articles: NewsArticle[]; hasMore: boolean } = await res.json();
        setArticles((prev) => [...prev, ...data.articles]);
        setHasMore(data.hasMore);
        setPage(nextPage);
        setLoading(false);
    }, [loading, hasMore, page]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) loadMore(); },
            { rootMargin: '300px' }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore]);

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
        </>
    );
}
