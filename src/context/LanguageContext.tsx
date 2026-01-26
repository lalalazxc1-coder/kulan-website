"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

type Language = "ru" | "en" | "kk";
type TranslationKey = keyof typeof translations.ru;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLang = "ru" }: { children: React.ReactNode, initialLang?: Language }) {
    const [language, setLanguage] = useState<Language>(initialLang);

    // Sync with localStorage on mount (optional, if we want to prioritize LS over cookie on first load,
    // but usually cookie is better for SSR. Let's keep it simple: Cookie > LS).
    // Actually, to prevent FOUC, we rely on initialLang.
    // We can update the cookie when language changes.
    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("kulan_lang", lang);
        document.documentElement.lang = lang;
        document.cookie = `kulan_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    };

    const t = (key: string) => {
        const dict = translations[language] as Record<string, string>;
        return dict[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
