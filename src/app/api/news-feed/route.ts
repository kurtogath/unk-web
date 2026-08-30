import { getNews } from '@/app/lib/news';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get('page') ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? 12)));

    const data = await getNews(page, limit);
    return NextResponse.json(data);
}
