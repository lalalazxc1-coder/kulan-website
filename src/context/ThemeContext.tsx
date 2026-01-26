'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark';
    mounted: boolean; // Expose mounted state so toggles can prevent hydration mismatch locally
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme;
        if (saved) {
            setThemeState(saved);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return; // Wait until mounted to avoid mismatch? Or apply immediately if possible?

        const applyTheme = () => {
            const root = document.documentElement;
            const isDark =
                theme === 'dark' ||
                (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

            setResolvedTheme(isDark ? 'dark' : 'light');

            if (isDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme();

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => applyTheme();
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme, mounted]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // ALWAYS render Provider. Do NOT conditionally return children without provider!
    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, mounted }}>
            {/* 
              We render children immediately. 
              Components that need to know 'theme' for rendering (like Toggle) should check 'mounted' 
              to avoid hydration errors if they render different icons based on theme.
            */}
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
