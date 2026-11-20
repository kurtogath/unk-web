import { query } from '@/app/lib/db';
import type { ProjectCard } from '@/app/types';

type ProjectRow = {
    id: string | number;
    title: string;
    locked: boolean | null;
    featured: boolean | null;
    size: ProjectCard['size'] | null;
    tilt: ProjectCard['tilt'];
    image: string;
    link: string | null;
};

export async function getProjects(): Promise<ProjectCard[]> {
    const rows = await query<ProjectRow>(
        `SELECT id, title, locked, featured, size, tilt, image, link
         FROM projects
         ORDER BY sort_order ASC, id ASC`
    );

    return rows.map((row) => ({
        id: Number(row.id),
        title: row.title,
        locked: row.locked ?? false,
        featured: row.featured ?? false,
        size: row.size ?? 'default',
        tilt: row.tilt,
        image: row.image,
        link: row.link ?? '',
    }));
}
