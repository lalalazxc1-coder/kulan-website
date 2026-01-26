"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingControls } from "@/components/FloatingControls";
import { FeedbackModal } from "@/components/FeedbackModal";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useLanguage } from "@/context/LanguageContext";
import { Branch, BranchLocation } from "@prisma/client";

type BranchWithLocations = Branch & { locations: BranchLocation[] };

interface ContactsViewProps {
    branches: BranchWithLocations[];
}

export function ContactsView({ branches }: ContactsViewProps) {
    const { t, language } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Find Head Office (special slug)
    const headOfficeBranch = branches.find(b => b.slug === 'head_office');
    const headOfficeLoc = headOfficeBranch?.locations.find(l => l.type === 'head_office') || headOfficeBranch?.locations[0];

    // Other branches
    const regionalBranches = branches.filter(b => b.slug !== 'head_office');

    // Helper to get localized string dynamically with type safety
    const getLoc = <T extends Record<string, any>>(obj: T, field: string): string => {
        const key = `${field}_${language}`;
        const val = obj[key];
        if (typeof val === 'string' && val) return val;

        const fallbackKey = `${field}_ru`;
        const fallbackVal = obj[fallbackKey];
        return typeof fallbackVal === 'string' ? fallbackVal : '';
    };

    const getList = (str: string | null) => {
        if (!str) return [];
        return str.split(',').map(s => s.trim()).filter(Boolean);
    };

    useEffect(() => {
        document.title = `${t("contacts_title")} | Kulan Oil`;
    }, [t]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 font-sans overflow-x-hidden">
            <ParticleBackground />
            <FloatingControls />
            <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <Header />

            <main className="flex-grow pt-28 pb-16 relative z-10 transition-opacit animate-fade-in">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                            {t("contacts_title")}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                            {t("contacts_subtitle")}
                        </p>
                    </div>

                    {/* Head Office */}
                    {headOfficeLoc && headOfficeBranch && (
                        <div className="mb-12 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl max-w-4xl mx-auto border border-white dark:border-slate-700 transition-all">
                            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-kulanBlue dark:text-blue-400 text-xl">
                                    <i className="fas fa-building"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {getLoc(headOfficeBranch, 'name')}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <p className="text-gray-600 dark:text-gray-300 flex items-start gap-3">
                                        <i className="fas fa-map-marker-alt text-kulanBlue dark:text-blue-400 mt-1"></i>
                                        <span>
                                            <span className="font-bold text-gray-900 dark:text-white block text-sm mb-1">{t("addr_label")}</span>
                                            <span>{getLoc(headOfficeLoc, 'address')}</span>
                                        </span>
                                    </p>

                                    {(headOfficeLoc as any).mapLink && (
                                        <a href={(headOfficeLoc as any).mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-kulanBlue dark:text-blue-400 font-bold text-sm hover:underline pl-7">
                                            <i className="fas fa-external-link-alt"></i>
                                            {t("view_on_map")}
                                        </a>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    {headOfficeLoc.phones && (
                                        <p className="text-gray-600 dark:text-gray-300 flex items-start gap-3">
                                            <i className="fas fa-phone text-kulanBlue dark:text-blue-400 mt-1"></i>
                                            <span>
                                                <span className="font-bold text-gray-900 dark:text-white block text-sm mb-1">{t("phone_label")}</span>
                                                {getList(headOfficeLoc.phones).map((ph, idx) => (
                                                    <span key={idx} className="block">{ph}</span>
                                                ))}
                                            </span>
                                        </p>
                                    )}
                                    {headOfficeLoc.emails && (
                                        <p className="text-gray-600 dark:text-gray-300 flex items-start gap-3">
                                            <i className="fas fa-envelope text-kulanBlue dark:text-blue-400 mt-1"></i>
                                            <span>
                                                <span className="font-bold text-gray-900 dark:text-white block text-sm mb-1">{t("email_label")}</span>
                                                {getList(headOfficeLoc.emails).map((em, idx) => (
                                                    <span key={idx} className="block">{em}</span>
                                                ))}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="relative mb-12">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-gray-50 dark:bg-slate-900 px-6 text-2xl font-heading font-bold text-gray-900 dark:text-white">
                                {t("branches_title")}
                            </span>
                        </div>
                    </div>

                    {/* Regional Branches Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regionalBranches.map((branch) => (
                            <div key={branch.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-white dark:border-slate-700 group h-full">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-slate-700 pb-2">
                                    {getLoc(branch, 'name')}
                                </h4>
                                <div className="space-y-6">
                                    {branch.locations.map((loc) => {
                                        const icon = loc.type === 'office' ? 'fa-building' : 'fa-warehouse';
                                        // Specific name or fallback to type label translation
                                        let typeLabel = getLoc(loc, 'name');
                                        if (!typeLabel) {
                                            typeLabel = loc.type === 'office' ? t('office_label') : t('warehouse_label');
                                        }

                                        return (
                                            <div key={loc.id} className="border-l-2 border-gray-100 dark:border-slate-700 pl-3">
                                                <div className="flex items-center gap-2 text-kulanBlue dark:text-blue-400 font-bold text-sm mb-1">
                                                    <i className={`fas ${icon}`}></i> <span>{typeLabel}</span>
                                                </div>

                                                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{getLoc(loc, 'address')}</p>
                                                {(loc as any).mapLink && (
                                                    <a href={(loc as any).mapLink} target="_blank" rel="noopener noreferrer" className="inline-block text-[11px] font-bold text-kulanBlue dark:text-blue-400 mb-2 hover:underline">
                                                        <i className="fas fa-map-marked-alt mr-1"></i> {t("view_on_map")}
                                                    </a>
                                                )}

                                                <div className="text-[10px] text-gray-400 dark:text-gray-500 space-y-1">
                                                    {getList(loc.phones).map((ph, idx) => (
                                                        <div key={idx}><i className="fas fa-phone mr-1"></i> {ph}</div>
                                                    ))}
                                                    {getList(loc.emails).map((em, idx) => (
                                                        <div key={idx}><i className="fas fa-envelope mr-1"></i> {em}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {branch.locations.length === 0 && (
                                        <p className="text-sm text-gray-400 italic">{t("catalog_nothing_found")}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            </main >

            <Footer />
        </div >
    );
}
