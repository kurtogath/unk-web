import { query } from '@/app/lib/db';
import type { NewsArticle } from '@/app/types';

type NewsRow = {
    id: string | number;
    title: string;
    subtitle: string | null;
    body: string | null;
    image: string | null;
    // Columna DATE: db.ts hace que llegue como texto 'YYYY-MM-DD'.
    // Se admite Date por si la columna pasa a ser TIMESTAMP en el futuro.
    published_at: string | Date;
    views: string | number;
    link: string;
    category: string | null;
};

const MONTH_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
const EXCERPT_LENGTH = 120;

// Zona horaria del público de la web. Solo se usa si la fecha trae hora (TIMESTAMP).
const TIME_ZONE = 'Europe/Madrid';

const NAMED_ENTITIES: Record<string, string> = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    hellip: '…', mdash: '—', ndash: '–', laquo: '«', raquo: '»',
    ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', bull: '•', middot: '·',
    iexcl: '¡', iquest: '¿', euro: '€', copy: '©', reg: '®', deg: '°',
    aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú',
    Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú',
    ntilde: 'ñ', Ntilde: 'Ñ', uuml: 'ü', Uuml: 'Ü', ccedil: 'ç', Ccedil: 'Ç',
};

// Decodifica entidades HTML con nombre (&amp;, &aacute;…) y numéricas (&#225;, &#xE1;)
// en una sola pasada, así "&amp;lt;" queda como "&lt;" y no como "<".
function decodeEntities(text: string): string {
    return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
        if (entity[0] === '#') {
            const hex = entity[1] === 'x' || entity[1] === 'X';
            const codePoint = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
            return codePoint > 0 && codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : match;
        }
        return NAMED_ENTITIES[entity] ?? match;
    });
}

// Pasa el HTML del body a texto plano. Las etiquetas se cambian por un espacio
// para que no se peguen las palabras de párrafos distintos (<p>a</p><p>b</p>).
function htmlToText(html: string): string {
    return decodeEntities(html.replace(/<[^>]+>/g, ' '))
        .replace(/\s+/g, ' ')
        .trim();
}

// Recorta por caracteres reales (no unidades UTF-16) para no partir emojis.
function truncate(text: string, length: number): string {
    const chars = Array.from(text);
    if (chars.length <= length) return text;
    return chars.slice(0, length).join('').trimEnd() + '…';
}

// '2026-11-20' → '20 NOV 2026'
function formatDateEs(value: string | Date): string {
    if (typeof value === 'string') {
        const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
        if (match) {
            const [, year, month, day] = match;
            return `${Number(day)} ${MONTH_ES[Number(month) - 1]} ${year}`;
        }
    }

    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: TIME_ZONE,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).formatToParts(new Date(value));
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
    return `${get('day')} ${MONTH_ES[get('month') - 1]} ${get('year')}`;
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
         ORDER BY n.published_at DESC, n.id DESC
         LIMIT $1 OFFSET $2`,
        [limit + 1, offset]
    );

    const hasMore = rows.length > limit;
    const articles = rows.slice(0, limit).map((row) => ({
        id: Number(row.id),
        title: row.title,
        subtitle: row.subtitle ?? null,
        excerpt: row.body ? truncate(htmlToText(row.body), EXCERPT_LENGTH) : '',
        image: row.image ?? null,
        publishedAt: formatDateEs(row.published_at),
        views: Number(row.views),
        link: row.link,
        category: row.category ?? null,
    }));

    return { articles, hasMore };
}
