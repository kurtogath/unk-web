export type StaffMember = {
    /** Posición en la lista (para el `key` de React). */
    id: number;
    /** Usuario de Instagram sin @, o null si no tiene. */
    instagram: string | null;
    instagramUrl: string | null;
    /** URL de la foto, o null si no tiene (se pone el avatar genérico). */
    avatar: string | null;
};
