import { getNews } from '@/app/lib/news';
import { NextResponse } from 'next/server';

// Convierte un parámetro de la URL en un entero dentro de [min, max].
// Si no es un número válido (p. ej. ?page=abc), usa el valor por defecto.
function intParam(value: string | null, fallback: number, min: number, max: number): number {
    const n = Number.parseInt(value ?? '', 10);
    if (Number.isNaN(n)) return fallback;
    return Math.min(max, Math.max(min, n));
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = intParam(searchParams.get('page'), 1, 1, 10_000);
    const limit = intParam(searchParams.get('limit'), 12, 1, 50);

    try {
        const data = await getNews(page, limit);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error obteniendo noticias de la BBDD:', error);
        return NextResponse.json({ error: 'No se pudieron cargar las noticias' }, { status: 500 });
    }
}
