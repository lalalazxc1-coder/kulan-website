"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function ProjectsSection() {
    const { t } = useLanguage();

    return (
        <section
            id="projects"
            className="min-h-screen py-24 bg-transparent dark:bg-transparent scroll-mt-24 transition-colors duration-300"
        >
            <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                    {t("projects_title")}
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    {t("projects_subtitle")}
                </p>
            </div>

            <div className="container mx-auto px-4 md:px-6 flex flex-col gap-12 pb-24">
                {/* Project 1: Adkulan - z-10 */}
                <div className="sticky-project sticky top-28 sm:top-32 md:top-40 z-10 w-full bg-white dark:bg-slate-800 rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 min-h-[500px] flex flex-col md:flex-row origin-top transition-transform duration-300">
                    <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 fade-up-trigger">
                        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-kulanBlue dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl mb-8">
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                            {t("project2_title")}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {t("project2_desc")}
                        </p>

                        <div className="bg-white dark:bg-slate-700/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-600 mb-8 shadow-lg">
                            <div className="flex items-start gap-4">
                                <i className="fas fa-check-circle text-kulanBlue dark:text-blue-400 mt-1"></i>
                                <div>
                                    <h5 className="font-bold text-gray-900 dark:text-white mb-1">
                                        {t("project2_card_title")}
                                    </h5>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {t("project2_card_desc")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://adkulan.kz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-kulanBlue dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition group w-max"
                        >
                            <span>{t("project2_btn")}</span>
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                                <i className="fas fa-arrow-right text-xs"></i>
                            </div>
                        </a>
                    </div>
                    <div className="w-full md:w-1/2 bg-blue-50 dark:bg-blue-900/10 relative overflow-hidden h-[300px] md:h-auto order-1 md:order-2 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent dark:from-slate-800 dark:to-transparent z-10"></div>
                        <Image
                            src="/images/adkulann.jpg"
                            alt="Adkulan"
                            fill
                            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>

                {/* Project 2: Miles - z-20 */}
                <div className="sticky-project sticky top-32 sm:top-36 md:top-48 z-20 w-full bg-gray-900 dark:bg-black text-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-800 dark:border-gray-800 min-h-[500px] flex flex-col md:flex-row origin-top transition-transform duration-300">
                    <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 fade-up-trigger">
                        <div className="w-14 h-14 bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center text-2xl mb-8">
                            <i className="fas fa-cogs"></i>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            {t("project3_title")}
                        </h3>
                        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            <span>
                                {t("project3_desc1")}
                            </span>
                            <br />
                            <br />
                            <span className="text-sm opacity-70">
                                {t("project3_li1")}
                            </span>
                        </p>

                        <a
                            href="https://miles.kz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-red-500 font-bold hover:text-red-400 transition group w-max"
                        >
                            <span>{t("project3_btn")}</span>
                            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                                <i className="fas fa-arrow-right text-xs"></i>
                            </div>
                        </a>
                    </div>
                    <div className="w-full md:w-1/2 bg-gray-800 dark:bg-gray-900 relative overflow-hidden h-[300px] md:h-auto order-1 md:order-2 group">
                        <Image
                            src="/images/miles.jpg"
                            alt="Miles"
                            fill
                            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105 opacity-80"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>

                {/* Project 3: Exline - z-30 */}
                <div className="sticky-project sticky top-36 sm:top-40 md:top-56 z-30 w-full bg-white dark:bg-slate-800 rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 min-h-[500px] flex flex-col md:flex-row origin-top transition-transform duration-300">
                    <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 fade-up-trigger">
                        <div className="w-14 h-14 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-2xl flex items-center justify-center text-2xl mb-8">
                            <i className="fas fa-truck-fast"></i>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                            {t("project4_title")}
                        </h3>
                        <h4 className="text-xl font-bold text-gray-500 dark:text-gray-400 mb-6">
                            {t("project4_subtitle")}
                        </h4>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {t("project4_desc")}
                        </p>

                        <a
                            href="https://exline.kz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-green-600 font-bold hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 transition group w-max"
                        >
                            <span>{t("project4_btn")}</span>
                            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                                <i className="fas fa-arrow-right text-xs"></i>
                            </div>
                        </a>
                    </div>
                    <div className="w-full md:w-1/2 bg-green-50 dark:bg-green-900/10 relative overflow-hidden h-[300px] md:h-auto order-1 md:order-2 group">
                        <Image
                            src="/images/exline.jpg"
                            alt="ExLine"
                            fill
                            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
