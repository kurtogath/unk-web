import { query } from '@/app/lib/db';
import type { NewsArticle } from '@/app/types';

type NewsRow = {
    id: string | number;
    title: string;
    subtitle: string | null;
    body: string | null;
    image: string | null;
    published_at: Date | string;
    views: string | number;
    link: string;
    category: string | null;
};

const MONTH_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

function stripHtml(html: string): string {
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function formatDateEs(date: Date): string {
    return `${date.getDate()} ${MONTH_ES[date.getMonth()]} ${date.getFullYear()}`;
}

export async function getNews(
    page = 1,
    limit = 12
): Promise<{ articles: NewsArticle[]; hasMore: boolean }> {
    const offset = (page - 1) * limit;
    const rows = await query<NewsRow>(
        `SELECT n.id, n.title, n.subtitle, n.body, n.image, n.published_at, n.views, n.link,
                c.name AS category
         FROM news n
         LEFT JOIN categories c ON c.id = n.category_id
         ORDER BY n.published_at DESC
         LIMIT $1 OFFSET $2`,
        [limit + 1, offset]
    );

    const hasMore = rows.length > limit;
    const articles = rows.slice(0, limit).map((row) => {
        const body = row.body ? stripHtml(row.body) : '';
        return {
            id: Number(row.id),
            title: row.title,
            subtitle: row.subtitle ?? null,
            excerpt: body.length > 120 ? body.slice(0, 120).trimEnd() + '…' : body,
            image: row.image ?? null,
            publishedAt: formatDateEs(new Date(row.published_at)),
            views: Number(row.views),
            link: row.link,
            category: row.category ?? null,
        };
    });

    return { articles, hasMore };
}
