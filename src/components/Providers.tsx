"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";

export function Providers({ children, lang }: { children: React.ReactNode, lang?: "ru" | "en" | "kk" }) {
    return (
        <LanguageProvider initialLang={lang}>
            <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </NextThemesProvider>
        </LanguageProvider>
    );
}
