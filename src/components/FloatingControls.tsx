"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function FloatingControls() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [showScroll, setShowScroll] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const checkScrollTop = () => {
            if (!showScroll && window.scrollY > 400) {
                setShowScroll(true);
            } else if (showScroll && window.scrollY <= 400) {
                setShowScroll(false);
            }
        };

        window.addEventListener("scroll", checkScrollTop);
        return () => window.removeEventListener("scroll", checkScrollTop);
    }, [showScroll]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!mounted) return null;

    return (
        <>
            {/* Scroll To Top */}
            <button
                onClick={scrollTop}
                className={`fixed bottom-20 right-4 md:bottom-24 md:right-8 z-40 w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-kulanBlue dark:text-blue-400 rounded-full shadow-xl flex items-center justify-center md:hover:scale-110 active:scale-95 transition-all duration-300 border border-gray-100 dark:border-slate-700 cursor-pointer ${showScroll ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 translate-y-10 invisible pointer-events-none'}`}
                aria-label="Scroll to Top"
            >
                <i className="fas fa-arrow-up text-lg"></i>
            </button>

            {/* Theme Toggle - Sun/Moon */}
            <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-12 h-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-kulanBlue dark:text-yellow-400 rounded-full shadow-lg shadow-kulanBlue/10 flex items-center justify-center hover:scale-105 active:scale-95 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 border border-white/40 dark:border-slate-700 cursor-pointer group"
                aria-label="Toggle Dark Mode"
            >
                <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500">
                    {resolvedTheme === "dark" ? (
                        <i className="fas fa-moon text-lg"></i>
                    ) : (
                        <i className="fas fa-sun text-lg"></i>
                    )}
                </div>
            </button>
        </>
    );
}
