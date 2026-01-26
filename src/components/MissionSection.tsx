"use client";

import { useLanguage } from "@/context/LanguageContext";

export function MissionSection() {
    const { t } = useLanguage();

    return (
        <section
            id="mission"
            className="min-h-[fit-content] lg:min-h-screen py-24 bg-transparent dark:bg-transparent overflow-hidden scroll-mt-24 transition-colors duration-300"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                        {t("mission_values_title")}
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        {t("mission_subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
                    {/* Mission & Goal Card (Large - Spans 2 cols, 2 rows) */}
                    <div className="col-span-1 md:col-span-2 row-span-2 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 p-8 md:p-12 rounded-[40px] shadow-soft hover:shadow-card transition-all duration-500 group border border-gray-100 dark:border-slate-700 relative overflow-hidden flex flex-col justify-center fade-up-trigger">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

                        <div className="w-16 h-16 bg-kulanBlue rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-200 dark:shadow-none relative z-10">
                            <i className="fas fa-bullseye text-3xl"></i>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-gray-900 dark:text-white relative z-10">
                            {t("mission_main_title")}
                        </h3>
                        <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-10 relative z-10">
                            {t("mission_main_desc")}
                        </p>

                        <div className="border-t border-blue-100 dark:border-slate-700 pt-8 relative z-10">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                                {t("mission_goal_title")}
                            </h4>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                                <p>
                                    {t("mission_goal_desc1")}
                                </p>
                                <p>
                                    {t("mission_goal_desc2")}
                                </p>
                                <p>
                                    {t("mission_goal_desc3")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Principles Card (Right Top) */}
                    <div className="col-span-1 row-span-1 bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-soft border border-gray-100 dark:border-slate-700 flex flex-col justify-center h-full fade-up-trigger">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-kulanOrange text-xs">
                                <i className="fas fa-star"></i>
                            </div>
                            <span>{t("principles_title")}</span>
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                <i className="fas fa-check text-kulanOrange mt-1 shrink-0"></i>
                                <span>{t("principles_li1")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                <i className="fas fa-check text-kulanOrange mt-1 shrink-0"></i>
                                <span>{t("principles_li2")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                <i className="fas fa-check text-kulanOrange mt-1 shrink-0"></i>
                                <span>{t("principles_li3")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                <i className="fas fa-check text-kulanOrange mt-1 shrink-0"></i>
                                <span>{t("principles_li4")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                <i className="fas fa-check text-kulanOrange mt-1 shrink-0"></i>
                                <span>{t("principles_li5")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                <i className="fas fa-check text-kulanOrange mt-1 shrink-0"></i>
                                <span>{t("principles_li6")}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Values Card (Right Bottom) */}
                    <div className="col-span-1 row-span-1 bg-kulanBlue dark:bg-blue-800 text-white p-8 rounded-[40px] shadow-soft border border-blue-600 dark:border-blue-700 flex flex-col justify-center h-full relative overflow-hidden fade-up-trigger">
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-2xl opacity-50"></div>
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-3 relative z-10">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                                <i className="fas fa-heart"></i>
                            </div>
                            <span>{t("values_card_title")}</span>
                        </h4>
                        <ul className="space-y-3 relative z-10">
                            <li className="flex items-start gap-3 text-sm font-medium opacity-90">
                                <i className="fas fa-check-circle mt-1 shrink-0"></i>
                                <span>{t("values_li1_new")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium opacity-90">
                                <i className="fas fa-check-circle mt-1 shrink-0"></i>
                                <span>{t("values_li2_new")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium opacity-90">
                                <i className="fas fa-check-circle mt-1 shrink-0"></i>
                                <span>{t("values_li3_new")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium opacity-90">
                                <i className="fas fa-check-circle mt-1 shrink-0"></i>
                                <span>{t("values_li4_new")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium opacity-90">
                                <i className="fas fa-check-circle mt-1 shrink-0"></i>
                                <span>{t("values_li5_new")}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
