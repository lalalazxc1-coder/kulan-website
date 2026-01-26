"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string; // For Tailwind classes (bg color, padding, etc.)
    // Strength of the magnetic pull (higher = stronger pull away from center)
    strength?: number;
}

export function MagneticButton({
    children,
    className = "",
    strength = 30, // Default strength
}: MagneticButtonProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const content = contentRef.current;
        if (!wrapper || !content) return;

        const xTo = gsap.quickTo(wrapper, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(wrapper, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        // Optional: Move text slightly more for parallex feel
        const xToText = gsap.quickTo(content, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yToText = gsap.quickTo(content, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = wrapper.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * (strength / 100)); // Scale down movement
            yTo(y * (strength / 100));

            xToText(x * (strength / 150)); // Text moves a bit less
            yToText(y * (strength / 150));
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            xToText(0);
            yToText(0);
        };

        wrapper.addEventListener("mousemove", handleMouseMove);
        wrapper.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            wrapper.removeEventListener("mousemove", handleMouseMove);
            wrapper.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div
            ref={wrapperRef}
            className={`relative inline-block ${className}`}
        >
            <div ref={contentRef} className="relative z-10">
                {children}
            </div>
        </div>
    );
}
