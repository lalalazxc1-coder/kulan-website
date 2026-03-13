"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer
            id="contacts"
            className="bg-transparent dark:bg-transparent text-gray-600 dark:text-gray-400 pt-12 pb-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 relative z-10"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-8 mb-8">
                    {/* 1. Logo Column */}
                    <div className="flex flex-col items-start lg:w-auto">
                        <Image
                            src="/logo.C6ZGBGWf.png"
                            alt="Kulan Oil"
                            width={120}
                            height={32}
                            className="h-8 mb-6 object-contain"
                        />
                    </div>

                    {/* 2. Navigation Column */}
                    <div className="lg:w-auto">
                        <h4 className="text-base font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 inline-block text-gray-900 dark:text-white">
                            {t("footer_nav")}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/#about"
                                    className="hover:text-kulanBlue dark:hover:text-white transition"
                                >
                                    {t("nav_about")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#mission"
                                    className="hover:text-kulanBlue dark:hover:text-white transition"
                                >
                                    {t("nav_mission")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#career"
                                    className="hover:text-kulanBlue dark:hover:text-white transition"
                                >
                                    {t("nav_career")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#projects"
                                    className="hover:text-kulanBlue dark:hover:text-white transition"
                                >
                                    {t("nav_projects")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacts"
                                    className="hover:text-kulanBlue dark:hover:text-white transition"
                                >
                                    {t("nav_contacts")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Projects Column */}
                    <div className="lg:w-auto">
                        <h4 className="text-base font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 inline-block text-gray-900 dark:text-white">
                            {t("nav_projects_title")}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <a
                                href="https://adkulan.kz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-md transition"
                            >
                                <Image
                                    src="/adkulan.png"
                                    alt="Adkulan"
                                    width={80}
                                    height={24}
                                    className="h-6 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </a>
                            <a
                                href="https://mobil1.kz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-md transition"
                            >
                                <Image
                                    src="/logomobil.png"
                                    alt="Mobil 1"
                                    width={80}
                                    height={24}
                                    className="h-6 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </a>
                            <a
                                href="https://miles.kz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center p-3 bg-gray-900 dark:bg-slate-800 rounded-xl border border-gray-800 dark:border-slate-700 hover:shadow-md transition"
                            >
                                <Image
                                    src="/logomiles.png"
                                    alt="Miles"
                                    width={80}
                                    height={24}
                                    className="h-6 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </a>
                        </div>
                    </div>

                    {/* 4. Social Media Column */}
                    <div className="lg:w-auto">
                        <h4 className="text-base font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 inline-block text-gray-900 dark:text-white">
                            {t("footer_social")}
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <a
                                    href="https://www.instagram.com/kulanoil.kz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-kulanBlue dark:hover:text-white transition flex items-center gap-3"
                                >
                                    <i className="fab fa-instagram text-lg w-5"></i> Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/channel/UCvSaQK6nt_b6Q8c2A4IyjBA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-kulanBlue dark:hover:text-white transition flex items-center gap-3"
                                >
                                    <i className="fab fa-youtube text-lg w-5"></i> YouTube
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/kulanoil.kz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-kulanBlue dark:hover:text-white transition flex items-center gap-3"
                                >
                                    <i className="fab fa-facebook-f text-lg w-5"></i> Facebook
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 5. Contacts Column */}
                    <div className="lg:w-auto">
                        <h4 className="text-base font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 inline-block text-gray-900 dark:text-white">
                            {t("footer_contacts")}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-map-marker-alt mt-1 text-kulanBlue text-xs"></i>
                                <span dangerouslySetInnerHTML={{ __html: t("footer_addr") }} />
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-phone mt-1 text-kulanBlue text-xs"></i> +7
                                (727) 273-02-02
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-envelope mt-1 text-kulanBlue text-xs"></i>
                                info@kulanoil.kz
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-gray-400 dark:text-gray-600 text-xs">
                    <span dangerouslySetInnerHTML={{ __html: t("footer_copy") }} />
                </div>
            </div>
        </footer>
    );
}
