"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
    const { t, language, setLanguage } = useLanguage();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Active section observer
        const sections = ['showcase', 'about', 'mission', 'career', 'projects'];
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.3, rootMargin: "-80px 0px -20% 0px" });

        if (pathname === '/') {
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, [pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = "";
    };

    const navLinks = [
        { href: "/#showcase", labelKey: "nav_showcase" },
        { href: "/#about", labelKey: "nav_about" },
        { href: "/#mission", labelKey: "nav_mission" },
        { href: "/#projects", labelKey: "nav_projects" },
        { href: "/#career", labelKey: "nav_career" },
        { href: "/catalog", labelKey: "nav_catalog" },
        { href: "/contacts", labelKey: "nav_contacts" },
    ];

    const LangButton = ({ lang }: { lang: "ru" | "en" | "kk" }) => (
        <button
            onClick={() => setLanguage(lang)}
            className={`transition font-bold ${language === lang ? 'text-kulanBlue dark:text-blue-400 border-b-2 border-kulanBlue dark:border-blue-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
        >
            {lang.toUpperCase()}
        </button>
    );

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Handle anchor links smooth scroll if on home page
        if (href.includes('#')) {
            const [path, hash] = href.split('#');
            const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
            const targetIsHome = path === '/' || path === '';

            if (isHomePage && targetIsHome) {
                e.preventDefault();
                const targetElem = document.getElementById(hash);

                if (targetElem) {
                    // Get Lenis instance from window (set in SmoothScrolling)
                    const lenis = (window as any).lenis;

                    if (lenis) {
                        // Calculate target position to center fullscreen sections
                        const targetRect = targetElem.getBoundingClientRect();
                        const targetTop = targetRect.top + window.pageYOffset;

                        // For fullscreen sections (min-h-screen), center them in viewport
                        // For others, use standard offset
                        const isFullscreen = targetElem.classList.contains('min-h-screen');
                        let scrollTarget;

                        if (isFullscreen) {
                            // Center the section in viewport
                            const viewportHeight = window.innerHeight;
                            const sectionHeight = targetRect.height;

                            if (sectionHeight >= viewportHeight) {
                                // Section is full height or taller - align to top with small offset
                                scrollTarget = targetTop - 80; // Header height
                            } else {
                                // Section is smaller - center it
                                const centerOffset = (viewportHeight - sectionHeight) / 2;
                                scrollTarget = targetTop - centerOffset;
                            }
                        } else {
                            // Standard offset for non-fullscreen sections
                            scrollTarget = targetTop - 100;
                        }

                        // Use Lenis smooth scroll
                        lenis.scrollTo(scrollTarget, {
                            duration: 1.5,
                            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                            onComplete: () => {
                                // Force ScrollTrigger refresh after navigation
                                if ((window as any).ScrollTrigger) {
                                    setTimeout(() => {
                                        (window as any).ScrollTrigger.refresh();
                                    }, 100);
                                }
                            }
                        });
                    } else {
                        // Fallback to native smooth scroll if Lenis not available
                        const headerOffset = 80;
                        const elementPosition = targetElem.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                }
            }
        }
        closeMenu();
    };

    const isActive = (href: string) => {
        if (href === pathname) return true;
        if ((pathname === '/' || pathname === '') && href.startsWith('/#')) {
            const sectionId = href.split('#')[1];
            return sectionId === activeSection;
        }
        return false;
    };

    return (
        <>
            <nav
                id="navbar"
                className={`fixed w-full z-50 py-4 transition-all duration-300 ${isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm py-3 dark:bg-slate-900/90"
                    : "bg-white/0"
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <Link href="/" className="relative z-50 block" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <Image
                            src="/logo.C6ZGBGWf.png"
                            alt="Kulan Oil Logo"
                            width={150}
                            height={40}
                            className="h-8 md:h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.labelKey}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`font-medium transition text-sm ${isActive(link.href)
                                    ? "text-kulanBlue dark:text-blue-400 font-bold"
                                    : "text-gray-600 dark:text-gray-300 hover:text-kulanBlue dark:hover:text-blue-400"}`}
                            >
                                {t(link.labelKey)}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <div className="flex items-center space-x-3 text-sm font-bold border-l pl-4 border-gray-300 dark:border-gray-700">
                            <LangButton lang="kk" />
                            <LangButton lang="ru" />
                            <LangButton lang="en" />
                        </div>

                        <a
                            href="https://adkulan.kz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 group hover:bg-gray-50 dark:hover:bg-white/5"
                        >
                            <span className="font-semibold text-sm text-gray-600 dark:text-gray-300 group-hover:text-kulanBlue dark:group-hover:text-blue-300 transition-colors">
                                {t("nav_store")}
                            </span>
                            <Image
                                src="/adkulan.png"
                                alt="Adkulan"
                                width={80}
                                height={24}
                                className="h-4 w-auto object-contain opacity-60 dark:opacity-50 dark:brightness-0 dark:invert group-hover:opacity-100 transition-all"
                            />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-xl text-kulanBlue dark:text-blue-400 focus:outline-none z-50 p-2"
                    >
                        <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 lg:hidden transition-all duration-300 ${isMenuOpen
                    ? "opacity-100 pointer-events-auto translate-x-0"
                    : "opacity-0 pointer-events-none translate-x-full"
                    }`}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.labelKey}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-xl font-heading font-medium text-gray-600 dark:text-gray-300 hover:text-kulanBlue dark:hover:text-blue-400 transition"
                    >
                        {t(link.labelKey)}
                    </Link>
                ))}

                {/* Mobile Language Switcher */}
                <div className="flex items-center space-x-8 text-lg font-bold py-2 border-t border-gray-100 dark:border-gray-800 w-1/2 justify-center mt-4">
                    <LangButton lang="kk" />
                    <LangButton lang="ru" />
                    <LangButton lang="en" />
                </div>

                <a
                    href="https://adkulan.kz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-kulanBlue text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl shadow-kulanBlue/20 flex items-center justify-center gap-3 w-4/5 max-w-[280px] mt-4 active:scale-95 transition-transform"
                >
                    <span>{t("project2_btn")}</span>
                    <Image
                        src="/adkulan.png"
                        alt="Adkulan"
                        width={20}
                        height={20}
                        className="h-5 w-auto object-contain brightness-0 invert"
                    />
                </a>
            </div>
        </>
    );
}
