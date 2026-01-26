"use client";

import Link from "next/link";
import { InteractiveMap } from "./InteractiveMap";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface HeroSectionProps {
    metrics: {
        stat_years: string;
        stat_clients: string;
        stat_brands: string;
        stat_branches: string;
        stat_employees: string;
    }
}

function AnimatedCounter({ value, duration = 2000, shouldStart }: { value: string, duration?: number, shouldStart: boolean }) {
    const numericPart = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) {
            setCount(0);
            return;
        }

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
    }, [numericPart, duration, shouldStart]);

    return (
        <span className="inline-block min-w-[1ch]">
            {count}{suffix}
        </span>
    );
}

export function HeroSection({ metrics }: HeroSectionProps) {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [shouldAnimateStats, setShouldAnimateStats] = useState(false);

    useEffect(() => {
        let ctx: gsap.Context;
        let eventListener: (() => void) | null = null;

        const playAnimation = () => {
            ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                    onComplete: () => {
                        // Start counter animation after main animation completes
                        setShouldAnimateStats(true);
                    }
                });

                tl.fromTo(titleRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 }
                )
                    .fromTo(descRef.current,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1 },
                        "-=0.8"
                    )
                    .fromTo(btnRef.current,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8 },
                        "-=0.8"
                    )
                    .fromTo(mapRef.current,
                        { opacity: 0 },
                        { opacity: 1, duration: 1.2 },
                        "-=1.2"
                    )
                    .fromTo(statsRef.current,
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8 },
                        "-=0.5"
                    );
            }, containerRef);
        };

        // Check if preloader exists and is still loading
        const hasPreloader = document.body.classList.contains("loading");

        if (hasPreloader) {
            // Wait for preloader to complete
            eventListener = playAnimation;
            window.addEventListener("preloader-complete", eventListener, { once: true });
        } else {
            // No preloader or navigating from another page - play immediately with small delay
            const timer = setTimeout(() => {
                playAnimation();
            }, 100); // Small delay to ensure DOM is ready

            return () => {
                clearTimeout(timer);
                if (ctx) ctx.revert();
            };
        }

        return () => {
            if (eventListener) {
                window.removeEventListener("preloader-complete", eventListener);
            }
            if (ctx) ctx.revert();
        };
    }, []); // Keep empty to run once per mount

    return (
        <header ref={containerRef} id="hero" className="relative min-h-[fit-content] lg:min-h-screen flex flex-col pt-24 pb-12 overflow-hidden bg-transparent z-10 group scroll-mt-32">
            {/* Background Decor */}
            <div className="hero-bg absolute top-0 right-0 w-3/4 h-[120%] -top-[10%] bg-gradient-to-l from-blue-50/40 to-transparent dark:from-blue-900/10 dark:to-transparent skew-x-12 transform translate-x-32 hidden md:block pointer-events-none"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kulanBlue/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-kulanBlue/5 dark:bg-kulanBlue/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center my-8 lg:my-0">
                <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-12 gap-8 items-center">
                    {/* Text Content - 7 cols on md to push map, 5 cols on lg */}
                    <div className="md:col-span-7 lg:col-span-5 text-center md:text-left order-2 md:order-1 relative z-20">
                        <h1 ref={titleRef} className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6 opacity-0">
                            <span dangerouslySetInnerHTML={{ __html: t("hero_title") }} />
                        </h1>

                        <p ref={descRef} className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed text-base md:text-lg opacity-0">
                            {t("hero_desc")}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 mt-8 opacity-0" ref={btnRef}>
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 backdrop-blur-sm max-w-md">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-kulanBlue dark:text-blue-400 shrink-0">
                                    <i className="fas fa-map-location-dot text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white leading-tight text-lg mb-1">
                                        {t("hero_map_title")}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {t("hero_map_desc")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Map Content - constrained col-span on md */}
                    <div ref={mapRef} className="md:col-span-5 lg:col-span-7 order-1 md:order-2 relative w-full flex items-center justify-center md:justify-end overflow-visible opacity-0 -mr-0 lg:-mr-24 mt-8 md:mt-0 md:pl-0 lg:pl-0 translate-x-8 lg:translate-x-16 xl:translate-x-24">
                        {/* Container scales map but respects aspect ratio */}
                        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[350px] lg:h-[550px] xl:h-[650px] max-w-full">
                            <InteractiveMap />
                        </div>
                    </div>
                </div>
            </div>

            {/* Integrated Stats Row - Transparent & Closer */}
            <div className="w-full relative z-20 mt-auto lg:mb-12">
                <div ref={statsRef} className="container mx-auto px-4 py-4 md:py-6 grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 text-center opacity-0">
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-kulanBlue dark:text-blue-400 mb-1 font-heading">
                            <AnimatedCounter value={metrics?.stat_years} shouldStart={shouldAnimateStats} />
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                            {t("stat_years")}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-kulanBlue dark:text-blue-400 mb-1 font-heading">
                            <AnimatedCounter value={metrics?.stat_clients} shouldStart={shouldAnimateStats} />
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                            {t("stat_clients")}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-kulanBlue dark:text-blue-400 mb-1 font-heading">
                            <AnimatedCounter value={metrics?.stat_brands} shouldStart={shouldAnimateStats} />
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                            {t("stat_brands")}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-kulanBlue dark:text-blue-400 mb-1 font-heading">
                            <AnimatedCounter value={metrics?.stat_branches} shouldStart={shouldAnimateStats} />
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                            {t("stat_branches")}
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <div className="text-2xl md:text-3xl font-bold text-kulanBlue dark:text-blue-400 mb-1 font-heading">
                            <AnimatedCounter value={metrics?.stat_employees} shouldStart={shouldAnimateStats} />
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                            {t("stat_employees")}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
