"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 animate-pulse"></div>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-all focus:outline-none"
            aria-label="Toggle Theme"
        >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-lg transition-transform duration-500 ${theme === 'dark' ? 'rotate-90' : 'rotate-0'}`}></i>
        </button>
    );
}
