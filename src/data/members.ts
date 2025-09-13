import type { Member } from '@/types/index';

export const memberPath = (slug: string) => `/integrantes/${slug}`;

export const MEMBERS: Member[] = [
  { slug: '/integrantes/darioxgd',   name: 'Dario',     img: '/people/Dario.png' },
  { slug: '/integrantes/tresilloo',  name: 'Tresilloo', img: '/people/Tracy.png' },
  { slug: '/integrantes/kurtogath',  name: 'Kurto',     img: '/people/Kurto.png' },
];

export const memberSlugs = () => MEMBERS.map(m => m.slug);
export const memberBySlug = (slug: string) => MEMBERS.find(m => m.slug === slug);