"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const codeRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (codeRef.current && textRef.current && buttonRef.current) {
            tl.from(codeRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            })
                .from(textRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.4")
                .from(buttonRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)"
                }, "-=0.2");

            // Floating animation for the 404
            gsap.to(codeRef.current, {
                y: 10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900 text-center px-4 overflow-hidden"
        >
            {/* Background blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-kulanBlue/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

            <h1
                ref={codeRef}
                className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-kulanBlue to-blue-400 leading-none select-none"
            >
                404
            </h1>

            <div className="space-y-6 max-w-md mx-auto relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                    Страница не найдена
                </h2>
                <p
                    ref={textRef}
                    className="text-gray-600 dark:text-gray-400 text-lg"
                >
                    Похоже, эта бочка с маслом закатилась куда-то не туда...
                    Давайте вернемся на главную.
                </p>

                <Link
                    ref={buttonRef}
                    href="/"
                    className="inline-flex items-center gap-2 bg-kulanBlue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                >
                    <i className="fas fa-home"></i>
                    <span>На главную</span>
                </Link>
            </div>
        </div>
    );
}
