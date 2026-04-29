import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.scss';
import GoogleAnalytics from './lib/googleAnalytics';
import ThemeProvider from './components/ThemeProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

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
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        shortcut: [{ url: '/favicon.ico' }],
    },
    manifest: '/site.webmanifest',
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
        <html lang="es" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider>
                    {process.env.NEXT_PUBLIC_GA_ID && (
                        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
                    )}
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
