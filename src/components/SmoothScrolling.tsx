"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // 1. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            //   infinite: false,
        });

        // Make Lenis globally accessible for Header navigation
        (window as any).lenis = lenis;
        (window as any).ScrollTrigger = ScrollTrigger;

        // 2. Sync GSAP with Lenis
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Hero Parallax
        const heroBg = document.querySelector(".hero-bg");
        if (heroBg) {
            gsap.to(heroBg, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // 3. Global Animations Setup

        // Fade Up Elements
        const fadeElements = document.querySelectorAll(".fade-up-trigger");
        fadeElements.forEach((elem) => {
            gsap.fromTo(
                elem,
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 95%",
                        toggleActions: "play none none reverse",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                }
            );
        });

        // Stats Counters
        const statNumbers = document.querySelectorAll(".stat-number, .about-badge-number");
        statNumbers.forEach((element) => {
            const rawValue = element.getAttribute("data-value") || element.textContent || "";
            const finalValue = parseInt(rawValue.replace(/\D/g, ""));
            const suffix = rawValue.replace(/[0-9]/g, "");

            if (!isNaN(finalValue)) {
                const items = { val: 0 };
                gsap.to(items, {
                    val: finalValue,
                    duration: 2.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 95%",
                        once: true,
                    },
                    onUpdate: function () {
                        element.textContent = Math.ceil(items.val) + suffix;
                    },
                });
            }
        });

        // 🔥 STACKING CARDS ANIMATION FOR PROJECTS SECTION
        const setupStackingCards = () => {
            const projectCards = gsap.utils.toArray<HTMLElement>(".sticky-project");

            if (projectCards.length > 0) {
                projectCards.forEach((card, index) => {
                    // Skip the last card as it doesn't need to scale down
                    if (index === projectCards.length - 1) return;

                    const scaleRatio = 1 - (0.05 * (projectCards.length - index)); // Scale down slightly

                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.8, // Add distinct fade out
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top top+=140", // Match the CSS sticky top roughly (md:top-40 = 160px, sm:top-32 = 128px)
                            end: "bottom top+=40", // Animate while scrolling past it
                            scrub: true,
                            invalidateOnRefresh: true,
                        }
                    });
                });
            }
        };

        // Initialize stacking cards after a short delay to ensure DOM is ready
        setTimeout(() => {
            setupStackingCards();
            ScrollTrigger.refresh();
        }, 100);


        // 4. Ripple Effect Logic
        const rippleButtons = document.querySelectorAll(".ripple-btn, button, .btn, a.group");
        const handleRipple = function (this: HTMLElement, e: Event) {
            const mouseEvent = e as MouseEvent;
            const target = this;

            const style = window.getComputedStyle(target);
            if (style.position === "static") {
                target.style.position = "relative";
            }
            if (style.overflow !== "hidden") {
                target.style.overflow = "hidden";
            }

            const rect = target.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;

            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            target.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        };

        rippleButtons.forEach((btn) => {
            btn.addEventListener("click", handleRipple as EventListener);
        });

        return () => {
            // Cleanup
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            delete (window as any).lenis;
            delete (window as any).ScrollTrigger;
        };
    }, []);

    return <>{children}</>;
}
