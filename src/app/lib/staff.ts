import type { StaffMember } from '@/app/types';

// Proyecto del CRM que corresponde a esta web ("Web corporativa")
const CRM_PROJECT_SLUG = 'web';

// Único origen de fotos que acepta la web. Tiene que coincidir con
// images.remotePatterns de next.config.ts: next/image da error al pintar una
// imagen de un dominio no autorizado, y eso tumbaría la Home entera.
const AVATAR_URL_PREFIX = 'https://media.unkedition.com/avatars/';

// Reglas de usuario de Instagram: letras, números, puntos y guiones bajos, máx. 30.
const INSTAGRAM_HANDLE = /^[A-Za-z0-9._]{1,30}$/;

type ApiSigner = {
    instagram: string | null;
    instagram_url: string | null;
    avatar_url: string | null;
};

// El enlace se construye a partir del usuario validado, en lugar de usar la
// instagram_url del CRM tal cual: así nunca se pinta un href inesperado.
function instagramHandle(value: string | null): string | null {
    const handle = value?.trim().replace(/^@/, '') ?? '';
    return INSTAGRAM_HANDLE.test(handle) ? handle : null;
}

function avatarUrl(value: string | null): string | null {
    return value?.startsWith(AVATAR_URL_PREFIX) ? value : null;
}

// Personas que firman la web, en el orden que da el CRM (por antigüedad de la firma).
// Se pide desde el servidor: la clave nunca llega al navegador.
export async function getStaff(): Promise<StaffMember[]> {
    const baseUrl = process.env.ADMIN_API_URL;
    const apiKey = process.env.ADMIN_API_KEY;
    if (!baseUrl || !apiKey) {
        throw new Error('Faltan ADMIN_API_URL o ADMIN_API_KEY en las variables de entorno');
    }

    const res = await fetch(`${baseUrl}/api/public/projects/${CRM_PROJECT_SLUG}/signers`, {
        headers: { 'X-Api-Key': apiKey },
        cache: 'no-store', // la Home ya es dinámica: los cambios del CRM se ven en la siguiente visita
        signal: AbortSignal.timeout(3000), // si el CRM no responde, la Home no se queda esperando
    });
    if (!res.ok) throw new Error(`El CRM respondió ${res.status}`);

    const data = (await res.json()) as { signers?: ApiSigner[] };
    if (!Array.isArray(data.signers)) {
        throw new Error('Respuesta del CRM sin la lista "signers"');
    }

    return data.signers.map((signer, i) => {
        const instagram = instagramHandle(signer.instagram);
        return {
            id: i,
            instagram,
            instagramUrl: instagram ? `https://www.instagram.com/${instagram}/` : null,
            avatar: avatarUrl(signer.avatar_url),
        };
    });
}
