export type NewsArticle = {
    id: number;
    title: string;
    subtitle: string | null;
    excerpt: string;
    image: string | null;
    publishedAt: string;
    views: number;
    link: string;
    category: string | null;
};
