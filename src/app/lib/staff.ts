import { query } from '@/app/lib/db';
import type { StaffMember } from '@/app/types';

type StaffRow = {
    id: string | number;
    name: string;
    instagram_handle: string;
    avatar: string | null;
    role: string | null;
};

// La BBDD solo guarda el usuario (validado con un CHECK: letras, números, . y _),
// así que la URL se construye aquí y no puede quedar mal escrita.
function instagramUrl(handle: string): string {
    return `https://www.instagram.com/${handle}/`;
}

// Personas que firman el proyecto, en el orden de sort_order. Las inactivas no salen.
export async function getStaff(): Promise<StaffMember[]> {
    const rows = await query<StaffRow>(
        `SELECT id, name, instagram_handle, avatar, role
         FROM staff
         WHERE active
         ORDER BY sort_order ASC, id ASC`
    );

    return rows.map((row) => ({
        id: Number(row.id),
        name: row.name,
        instagramUrl: instagramUrl(row.instagram_handle),
        avatar: row.avatar,
        role: row.role,
    }));
}
