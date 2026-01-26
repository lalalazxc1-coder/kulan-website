"use client";

import { useLanguage } from "@/context/LanguageContext";


interface CTASectionProps {
    onOpenModal?: () => void;
}

export function CTASection({ onOpenModal }: CTASectionProps) {
    const { t } = useLanguage();

    return (
        <section
            id="cta"
            className="py-12 md:py-24 bg-transparent dark:bg-transparent scroll-mt-20 transition-colors duration-300"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div
                    className="relative bg-gradient-to-br from-kulanBlue to-blue-900 rounded-[2.5rem] p-10 md:p-20 text-center overflow-hidden shadow-2xl"
                    data-aos="zoom-in"
                >
                    {/* Background Effects */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-blue-500/20 blur-[100px]"></div>
                        <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[100px]"></div>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                            {t("cta_title")}
                        </h2>

                        <p className="text-blue-100 text-lg md:text-xl mb-12 leading-relaxed">
                            {t("cta_desc")}
                        </p>

                        <button
                            onClick={onOpenModal}
                            className="inline-flex items-center gap-3 bg-white text-kulanBlue px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
                        >
                            <span>{t("cta_btn")}</span>
                            <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
