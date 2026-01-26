'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";

interface StatsSectionProps {
    metrics: {
        stat_years: string;
        stat_clients: string;
        stat_brands: string;
        stat_branches: string;
        stat_employees: string;
    }
}

function AnimatedCounter({ value, start, duration = 2000 }: { value: string, start: boolean, duration?: number }) {
    const numericPart = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');
    const [count, setCount] = useState(numericPart); // Init with FINAL value
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (start && !hasAnimated) {
            setHasAnimated(true);
            setCount(0); // Reset to start animation

            let current = 0;
            const fps = 60;
            const totalFrames = (duration / 1000) * fps;
            const step = numericPart / totalFrames;

            const timer = setInterval(() => {
                current += step;
                if (current >= numericPart) {
                    setCount(numericPart);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, 1000 / fps);

            return () => clearInterval(timer);
        }
    }, [start, numericPart, duration, hasAnimated]);

    return (
        <span className="inline-block min-w-[1ch]">
            {count}{suffix}
        </span>
    );
}

export function StatsSection({ metrics }: StatsSectionProps) {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;

        // Fallback: Auto-start after 1 second to ensure we see numbers
        const fallbackTimer = setTimeout(() => {
            setStartAnimation(true);
        }, 1000);

        if (sectionRef.current) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setStartAnimation(true);
                        clearTimeout(fallbackTimer);

                        // Visual Entrance
                        const elements = sectionRef.current?.querySelectorAll(".fade-up-trigger");
                        if (elements && elements.length > 0) {
                            gsap.fromTo(elements,
                                { y: 50, opacity: 0 },
                                {
                                    y: 0,
                                    opacity: 1,
                                    duration: 0.8,
                                    stagger: 0.15,
                                    ease: "power2.out"
                                }
                            );
                        }

                        observer?.disconnect();
                    }
                },
                { threshold: 0.1 }
            );
            observer.observe(sectionRef.current);
        } else {
            setStartAnimation(true);
        }

        return () => {
            if (observer) observer.disconnect();
            clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col justify-center py-20 bg-transparent dark:bg-transparent border-y border-gray-100 dark:border-slate-800 snap-start">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 text-center">
                    <div className="fade-up-trigger">
                        <div className="stat-number text-4xl md:text-5xl font-bold text-kulanBlue dark:text-blue-400 mb-2 font-heading">
                            <AnimatedCounter value={metrics.stat_years} start={startAnimation} />
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                            {t("stat_years")}
                        </div>
                    </div>
                    <div className="fade-up-trigger">
                        <div className="stat-number text-4xl md:text-5xl font-bold text-kulanBlue dark:text-blue-400 mb-2 font-heading">
                            <AnimatedCounter value={metrics.stat_clients} start={startAnimation} />
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                            {t("stat_clients")}
                        </div>
                    </div>
                    <div className="fade-up-trigger">
                        <div className="stat-number text-4xl md:text-5xl font-bold text-kulanBlue dark:text-blue-400 mb-2 font-heading">
                            <AnimatedCounter value={metrics.stat_brands} start={startAnimation} />
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                            {t("stat_brands")}
                        </div>
                    </div>
                    <div className="fade-up-trigger">
                        <div className="stat-number text-4xl md:text-5xl font-bold text-kulanBlue dark:text-blue-400 mb-2 font-heading">
                            <AnimatedCounter value={metrics.stat_branches} start={startAnimation} />
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                            {t("stat_branches")}
                        </div>
                    </div>
                    <div className="fade-up-trigger col-span-2 lg:col-span-1">
                        <div className="stat-number text-4xl md:text-5xl font-bold text-kulanBlue dark:text-blue-400 mb-2 font-heading">
                            <AnimatedCounter value={metrics.stat_employees} start={startAnimation} />
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                            {t("stat_employees")}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
