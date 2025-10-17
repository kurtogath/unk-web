import type { Member } from '@/types/index';

export const memberPath = (slug: string) => `/integrantes/${slug}`;

export const MEMBERS: Member[] = [
  { slug: '/integrantes/darioxgd', name: 'DarioxGD', img: '/people/Dario.png', color: '#ed1b24'},
  { slug: '/integrantes/tresilloo', name: 'Tresilloo', img: '/people/Dario2.png', color:'#f9dd3b'},
  { slug: '/integrantes/kurtogath', name: 'Kurto', img: '/people/Dario3.png',  color:'#FF1493'},
];

export const memberSlugs = () => MEMBERS.map(m => m.slug);
export const memberBySlug = (slug: string) => MEMBERS.find(m => m.slug === slug);