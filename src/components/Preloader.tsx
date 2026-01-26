"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export function Preloader() {
    const [animationComplete, setAnimationComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const progressTrackRef = useRef<HTMLDivElement>(null);
    const [canExit, setCanExit] = useState(false);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        // 1. Initial State
        document.body.classList.add('loading'); // Mark as loading
        gsap.set(containerRef.current, { display: "flex" });
        gsap.set(logoRef.current, { opacity: 0, scale: 0.95 });
        gsap.set(progressRef.current, { width: "0%" });
        gsap.set(progressTrackRef.current, { opacity: 0 });

        // ... rest of init logic remains implicit by not touching it if I don't include it in Replacement?
        // Wait, replace_file_content replaces the whole block. I need to keep the animation logic.

        // 2. Start Animation Loop (Fake Progress)
        const tl = gsap.timeline();
        timelineRef.current = tl;

        tl.to(logoRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        })
            .to(progressTrackRef.current, {
                opacity: 1,
                duration: 0.3
            }, "-=0.4")
            .to(progressRef.current, {
                width: "85%", // Go to 85%
                duration: 2.5, // Taking 2.5s
                ease: "power2.out"
            });

        // 3. Logic: Wait for BOTH (Window Load) AND (Min Timer)
        const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1500)); // Min 1.5s show time

        const windowLoadPromise = new Promise((resolve) => {
            if (document.readyState === "complete") {
                resolve(true);
            } else {
                window.addEventListener("load", () => resolve(true));
            }
        });

        Promise.all([minTimePromise, windowLoadPromise]).then(() => {
            setCanExit(true);
        });

    }, []);

    // 4. When ready to exit (Min time passed + Loaded) -> Zip to 100%
    useEffect(() => {
        if (!canExit) return;

        // Kill the fake progress animation safely
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        // Fast finish to 100%
        gsap.to(progressRef.current, {
            width: "100%",
            duration: 0.6,
            ease: "power3.out",
            onComplete: () => setAnimationComplete(true)
        });
    }, [canExit]);

    // 4. Exit Animation (Triggered exactly when bar hits 100%)
    useEffect(() => {
        if (!animationComplete) return;

        const tl = gsap.timeline({ delay: 0.2 }); // Slight pause at 100% to register success

        tl.to([progressTrackRef.current, logoRef.current], {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in"
        })
            .to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut" // Curtain effect
            })
            .set(containerRef.current, { display: "none" })
            .call(() => {
                document.body.classList.remove('loading');
                window.dispatchEvent(new Event('preloader-complete'));
            });

    }, [animationComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-white dark:bg-slate-900 flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="relative flex flex-col items-center">
                {/* Logo wrapper */}
                <div ref={logoRef} className="relative w-48 md:w-64 mb-8 opacity-0">
                    <img
                        src="/logo.C6ZGBGWf.png"
                        alt="Kulan Oil"
                        className="w-full h-auto object-contain drop-shadow-sm"
                    />
                </div>

                {/* Progress Bar Track */}
                <div
                    ref={progressTrackRef}
                    className="h-1 w-48 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden opacity-0"
                >
                    {/* Progress Fill */}
                    <div
                        ref={progressRef}
                        className="h-full bg-kulanBlue dark:bg-blue-500 rounded-full shadow-[0_0_10px_rgba(0,51,102,0.5)] w-0"
                    ></div>
                </div>
            </div>
        </div>
    );
}
