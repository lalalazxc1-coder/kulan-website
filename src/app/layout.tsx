import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/800.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: '%s | Kulan Oil',
        default: 'Kulan Oil — Дистрибьюция смазочных материалов',
    },
    description: 'Официальный дистрибьютор Mobil, ExxonMobil в Казахстане. Широкий ассортимент масел и технических жидкостей.',
    metadataBase: new URL('https://adkulan.kz'),
    openGraph: {
        title: 'Kulan Oil — Дистрибьюция смазочных материалов',
        description: 'Официальный дистрибьютор Mobil, ExxonMobil в Казахстане.',
        url: 'https://adkulan.kz',
        siteName: 'Kulan Oil',
        images: [
            {
                url: '/og-image.jpg', // Make sure to add this image to public folder
                width: 1200,
                height: 630,
                alt: 'Kulan Oil Platform',
            },
        ],
        locale: 'ru_RU',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kulan Oil — Дистрибьюция смазочных материалов',
        description: 'Официальный дистрибьютор Mobil, ExxonMobil в Казахстане.',
        images: ['/og-image.jpg'],
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
};

import { cookies } from "next/headers";

// ... imports remain the same

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const lang = cookieStore.get("kulan_lang")?.value || "ru";

    return (
        <html lang={lang} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-900`}>
                {children}
            </body>
        </html>
    );
}
