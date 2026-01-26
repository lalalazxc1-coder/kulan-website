"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    perspective?: number; // Depth of 3D space
}

export function TiltCard({
    children,
    className = "",
    perspective = 1000,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const content = contentRef.current;
        const glare = glareRef.current;
        if (!card || !content || !glare) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = card.getBoundingClientRect();

            const x = clientX - left;
            const y = clientY - top;

            const centerX = width / 2;
            const centerY = height / 2;

            // Rotate values (-1 to 1 range approx, multiplied by max degree)
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg tilt
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(content, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: perspective,
            });

            // Glare movement
            gsap.to(glare, {
                x: x - width / 2,
                y: y - height / 2,
                opacity: 0.4, // Show glare
                duration: 0.5,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            // Reset
            gsap.to(content, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out",
            });

            gsap.to(glare, {
                opacity: 0,
                duration: 0.5,
            });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [perspective]);

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden ${className}`}
            style={{ perspective: `${perspective}px` }}
        >
            <div
                ref={contentRef}
                className="w-full h-full preserve-3d"
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </div>

            {/* Glare Element */}
            <div
                ref={glareRef}
                className="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-white/20 blur-3xl rounded-full pointer-events-none opacity-0 mix-blend-overlay"
                style={{ transform: "translate(-50%, -50%)" }}
            />
        </div>
    );
}
