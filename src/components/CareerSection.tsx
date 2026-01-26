"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

// Add props interface
interface CareerSectionProps {
    metrics?: {
        stat_employees: string;
    }
}

export function CareerSection({ metrics }: CareerSectionProps) {
    const { t } = useLanguage();

    return (
        <section
            id="career"
            className="min-h-screen flex flex-col justify-center py-24 bg-transparent dark:bg-transparent scroll-mt-24 transition-colors duration-300"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Text Content (Left) */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            {t("career_title")}
                        </h2>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed border-l-4 border-kulanBlue pl-6">
                            {t("career_desc")}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {/* Benefit 1 */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all group fade-up-trigger">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-slate-700 rounded-full shadow-sm flex items-center justify-center text-kulanOrange mb-4 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-trophy text-lg"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                    {t("career_card1_title")}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("career_card1_desc")}
                                </p>
                            </div>

                            {/* Benefit 2 */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all group fade-up-trigger">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-slate-700 rounded-full shadow-sm flex items-center justify-center text-kulanBlue dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-graduation-cap text-lg"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                    {t("career_card2_title")}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("career_card2_desc")}
                                </p>
                            </div>

                            {/* Benefit 3 */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all group fade-up-trigger">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-slate-700 rounded-full shadow-sm flex items-center justify-center text-green-500 mb-4 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-wallet text-lg"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                    {t("career_card3_title")}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("career_card3_desc")}
                                </p>
                            </div>

                            {/* Benefit 4 */}
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all group fade-up-trigger">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-slate-700 rounded-full shadow-sm flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                                    <i className="fas fa-clipboard-check text-lg"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                    {t("career_card4_title")}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("career_card4_desc")}
                                </p>
                            </div>
                        </div>

                        <a
                            href="https://hh.kz/employer/vacancies"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full justify-center items-center gap-3 px-8 py-4 bg-kulanBlue text-white rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <span>{t("career_btn")}</span>
                            <i className="fas fa-external-link-alt"></i>
                        </a>
                    </div>

                    {/* Image Content (Right) */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-kulanBlue/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group h-[600px] fade-up-trigger">
                            <Image
                                src="/images/career_meeting.jpg"
                                alt="Careers at Kulan Oil"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ objectFit: 'cover' }}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                            {/* Bottom Badge */}
                            <div className="absolute bottom-8 left-8 text-white max-w-xs">
                                <p className="text-3xl font-bold mb-1">{metrics?.stat_employees || '550+'}</p>
                                <p className="text-sm opacity-90 font-medium">
                                    {t("career_team_badge")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
