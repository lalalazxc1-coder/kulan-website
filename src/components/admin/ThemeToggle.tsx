'use client';

import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme, mounted } = useTheme();

    // Prevent hydration mismatch: render placeholder until mounted
    if (!mounted) {
        return <div className="w-16 h-8 bg-gray-200/50 dark:bg-slate-700/50 rounded-full animate-pulse"></div>;
    }

    const isDark = resolvedTheme === 'dark';

    const toggle = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggle}
            className={`
                relative w-16 h-8 rounded-full p-1 transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-kulanBlue/50
                ${isDark ? 'bg-slate-700' : 'bg-blue-100'}
            `}
            title={`Текущая тема: ${theme === 'system' ? 'Системная' : theme}`}
        >
            {/* Knob */}
            <div
                className={`
                    w-6 h-6 rounded-full shadow-lg transform transition-transform duration-500 ease-spring flex items-center justify-center
                    ${isDark ? 'translate-x-8 bg-slate-800 border-slate-600' : 'translate-x-0 bg-white'}
                `}
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }} // Spring effect
            >
                {/* Icon inside Knob */}
                {isDark ? (
                    <i className="fas fa-moon text-yellow-400 text-[10px] animate-fadeIn"></i>
                ) : (
                    <i className="fas fa-sun text-amber-500 text-[10px] animate-fadeIn"></i>
                )}
            </div>

            {/* Background Icons */}
            <div className={`absolute top-1/2 -translate-y-1/2 left-2 text-[10px] text-amber-500 pointer-events-none transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
                <i className="fas fa-sun"></i>
            </div>
            <div className={`absolute top-1/2 -translate-y-1/2 right-2 text-[10px] text-yellow-400 pointer-events-none transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                <i className="fas fa-moon"></i>
            </div>
        </button>
    );
}
