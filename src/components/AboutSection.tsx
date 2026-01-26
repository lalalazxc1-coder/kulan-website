"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <section
            id="about"
            className="min-h-[fit-content] lg:min-h-screen py-24 bg-transparent border-b border-gray-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300 scroll-mt-24"
        >
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 dark:bg-blue-900/10 skew-x-12 translate-x-32 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-stretch gap-16 lg:gap-24">
                    {/* Image Side with Unique Shape */}
                    <div className="w-full lg:w-1/2 relative flex flex-col">
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 h-full min-h-[400px] fade-up-trigger">
                            <Image
                                src="/images/about_team.jpg"
                                alt="Kulan Oil Team"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                style={{ objectFit: 'cover' }}
                            />


                        </div>
                        {/* Decorative dots */}
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-kulanBlue/10 rounded-full blur-2xl -z-10"></div>
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-100 dark:bg-orange-900/20 rounded-full blur-3xl -z-10"></div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2 fade-up-trigger">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                            Kulan Oil
                        </h2>
                        <p className="text-xl text-kulanBlue dark:text-blue-400 font-medium mb-8">
                            {t("about_subtitle")}
                        </p>

                        <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            <p className="font-medium text-gray-800 dark:text-gray-100 border-l-4 border-kulanBlue pl-6">
                                {t("about_desc_1")}
                            </p>
                            <p>
                                {t("about_desc_2")}
                            </p>
                            <p dangerouslySetInnerHTML={{ __html: t("about_desc_3") }}></p>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-lg text-center flex-1 hover:border-blue-100 transition-colors">
                                <i className="fas fa-certificate text-kulanOrange text-2xl mb-2"></i>
                                <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                                    {t("about_card_quality")}
                                </span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-lg text-center flex-1 hover:border-blue-100 transition-colors">
                                <i className="fas fa-globe text-kulanBlue dark:text-blue-400 text-2xl mb-2"></i>
                                <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                                    {t("about_card_scale")}
                                </span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-lg text-center flex-1 hover:border-blue-100 transition-colors">
                                <i className="fas fa-handshake text-green-500 text-2xl mb-2"></i>
                                <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                                    {t("about_card_trust")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
