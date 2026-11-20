import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.scss';
import GoogleAnalytics from './lib/googleAnalytics';

export const metadata: Metadata = {
    title: 'UNK Edition',
    description:
        'UNK Edition es un estudio de desarrollo que crea proyectos web experimentales, juegos online y herramientas digitales. Explora nuestros proyectos y aplicaciones.',
    keywords: [
        'UNK',
        'UNK Edition',
        'web development',
        'digital projects',
        'web apps',
        'experimentos web',
        'juegos online',
        'desarrollo web',
        'herramientas digitales',
        'software projects',
        'Rosalía o biblia',
        'Podcast',
        'música',
        'urbano',
        'juegos',
        'web apps',
        'digital projects',
        'software',
        'experimentos web',
    ],
    authors: [{ name: 'UNK Edition', url: 'https://unkedition.com' }],
    creator: 'UNK Edition',
    publisher: 'UNK Edition',
    metadataBase: new URL('https://unkedition.com'),
    alternates: {
        canonical: '/',
    },
    // FAVICONS - Configuración explícita para Google
    icons: {
        icon: [{ url: '/favicon.ico', sizes: 'any' }],
        shortcut: [{ url: '/favicon.ico' }],
    },
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://unkedition.com',
        siteName: 'UNK Edition',
        title: 'UNK Edition — Digital Community',
        description:
            'Comunidad digital proveedora de herramientas digitales y experiencias interactivas.',
        // images: [
        //     {
        //         url: '/og-image.png', // Crea esta imagen 1200x630px
        //         width: 1200,
        //         height: 630,
        //         alt: 'Rosalía o Biblia - Juego de adivinanzas',
        //     },
        // ],
    },
    // twitter: {
    //     card: 'summary_large_image',
    //     title: 'Rosalía o Biblia - ¿Puedes distinguir?',
    //     description:
    //         '¿Letra de Rosalía o versículo bíblico? Pon a prueba tu conocimiento en este divertido juego.',
    //     images: ['/og-image.png'], // Misma imagen que OpenGraph
    //     creator: '@unkedition', // Pon tu usuario de Twitter si lo tienes
    // },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: '',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
                {/* Google Analytics */}
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
                )}
                {children}
            </body>
        </html>
    );
}
