import { query } from '@/app/lib/db';
import type { ProjectCard } from '@/app/types';

type ProjectRow = Omit<ProjectCard, 'id' | 'link' | 'size'> & {
    id: string | number;
    link: string | null;
    size: 'default' | 'mid' | 'bottom' ;
};

export async function getProjects(): Promise<ProjectCard[]> {
    const rows = await query<ProjectRow>(
        'SELECT id, title, locked, featured, size, tilt, image, link, sort_order FROM projects ORDER BY sort_order ASC'
    );

    return rows.map((row) => ({
        ...row,
        id: Number(row.id),
        size: row.size === 'default' ? undefined : row.size,
        link: row.link ?? '',
    }));
}
