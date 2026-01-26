"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { getBranchesForMap } from "@/app/actions/getBranches";

import { CITIES, MAP_PATH } from "@/lib/constants/mapData";

type BranchData = Awaited<ReturnType<typeof getBranchesForMap>>[number];

export function InteractiveMap() {
    const { t, language } = useLanguage(); // language needed for dynamic field access
    const mapRef = useRef<HTMLDivElement>(null);
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);
    const [branches, setBranches] = useState<BranchData[]>([]);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (name: string) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setHoveredCity(name);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredCity(null);
        }, 300); // Delay to allow moving cursor to tooltip
    };

    // Initial animation & Data Fetch
    useEffect(() => {
        if (mapRef.current) {
            gsap.fromTo(
                mapRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power3.out" }
            );

            // Animate lines
            gsap.fromTo(
                ".map-connection-line",
                { pathLength: 0, opacity: 0 },
                {
                    pathLength: 1,
                    opacity: 1,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.5
                }
            );
        }

        async function loadData() {
            const data = await getBranchesForMap();
            setBranches(data);
        }
        loadData();
    }, []);

    // Helper to get localized field safely
    const getLoc = (obj: any, field: string) => {
        return obj?.[`${field}_${language}`] || obj?.[`${field}_ru`] || "";
    };

    return (
        <div ref={mapRef} className="relative h-full max-w-full mx-auto select-none transform scale-100 origin-center aspect-square md:scale-[1.1]">
            {/* Inline SVG Map */}
            <svg viewBox="0 0 1024 1024" className="w-full h-full pointer-events-none drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0, 1024) scale(0.1, -0.1)">
                    <path
                        d={MAP_PATH}
                        fill="transparent"
                        stroke="currentColor"
                        className="text-slate-300 dark:text-slate-600 transition-colors duration-300 stroke-[50px]"
                    />
                </g>
            </svg>

            {/* Connections Layer (Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                {CITIES.filter(c => c.type === 'branch').map((branch, i) => {
                    // Always connect to Almaty
                    const head = CITIES.find(c => c.name === "Алматы");
                    if (!head) return null;

                    const isLineActive = hoveredCity === branch.name;

                    const midLeft = (head.left + branch.left) / 2;
                    const midTop = (head.top + branch.top) / 2;

                    return (
                        <g key={`link-${i}`}>
                            {/* Line */}
                            <line
                                x1={`${head.left}%`}
                                y1={`${head.top}%`}
                                x2={`${branch.left}%`}
                                y2={`${branch.top}%`}
                                className={`transition-all duration-300 ${isLineActive ? 'stroke-kulanBlue dark:stroke-blue-400 opacity-100 stroke-[1px] animate-dash' : 'stroke-kulanBlue/20 dark:stroke-blue-400/20 opacity-60 stroke-[0.5px]'}`}
                                strokeDasharray={isLineActive ? "8 4" : "4 4"}
                            />

                            {/* Distance Badge (Visible on Hover) */}
                            {isLineActive && branch.distance && (
                                <g className="animate-in fade-in zoom-in duration-300 origin-center">
                                    <rect
                                        x={`${midLeft}%`}
                                        y={`${midTop}%`}
                                        width="50"
                                        height="16"
                                        rx="4"
                                        fill="white"
                                        stroke="#e2e8f0"
                                        strokeWidth="0.5"
                                        transform="translate(-25, -8)"
                                        className="drop-shadow-sm"
                                    />
                                    <text
                                        x={`${midLeft}%`}
                                        y={`${midTop}%`}
                                        textAnchor="middle"
                                        dy="3"
                                        fontSize="9"
                                        fill="#0f172a"
                                        fontWeight="bold"
                                        style={{ fontFamily: 'sans-serif' }}
                                    >
                                        {branch.distance} км
                                    </text>
                                </g>
                            )}
                        </g>
                    )
                })}
            </svg>

            {/* City Pins */}
            {CITIES.map((city) => {
                const isHead = city.type === "head";
                // Explicitly visible cities
                const isAlwaysVisible = isHead || ["Астана", "Шымкент", "Караганда", "Актобе", "Атырау", "Усть-Каменогорск"].includes(city.name);

                const isHovered = hoveredCity === city.name;
                const isVisible = isAlwaysVisible || isHovered;

                // Find matching branch data from DB
                // We assume mapData city names match name_ru in DB roughly, or we need a mapping.
                // For simplicity, we compare city.name (which is Russian in mapData) with name_ru
                const branchData = branches.find(b => b.name_ru === city.name);
                const showTooltip = isHovered && branchData;

                // --- Label Classes ---
                // IMPORTANT: If showing tooltip, we need pointer-events-auto to select text
                let labelClasses = "absolute whitespace-nowrap z-30 transition-all duration-300 font-bold";

                if (showTooltip) {
                    labelClasses += " pointer-events-auto scale-100";
                } else {
                    labelClasses += " pointer-events-none"; // Prevent blocking clicks when just label
                }

                if (isVisible) {
                    labelClasses += " opacity-100 translate-y-0";
                } else {
                    labelClasses += " opacity-0 translate-y-2";
                }

                // Determines position relative to dot
                const pos = city.labelPos || "top";
                // Default adjustments based on position
                if (city.name === "Астана") {
                    labelClasses += " right-full mr-3 top-1/2 -translate-y-1/2";
                } else if (pos === "bottom") {
                    labelClasses += " top-full mt-3 left-1/2 -translate-x-1/2";
                } else if (pos === "right") {
                    labelClasses += " left-full ml-3 top-1/2 -translate-y-1/2";
                } else {
                    // top default
                    labelClasses += " bottom-full mb-3 left-1/2 -translate-x-1/2";
                }

                // --- Tooltip Content ---
                // If hovered and we have data -> Show Rich Tooltip
                // Else -> Show simple text label

                return (
                    <div
                        key={city.name}
                        className={`absolute z-${isHovered ? "50" : (isAlwaysVisible ? "30" : "10")}`}
                        style={{ top: `${city.top}%`, left: `${city.left}%` }}
                    >
                        <div
                            className="relative flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2 group"
                            onMouseEnter={() => handleMouseEnter(city.name)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Ping for Head cities */}
                            {isHead && (
                                <div className="absolute w-6 h-6 bg-kulanBlue rounded-full animate-ping opacity-50 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                            )}

                            {/* Dot Component */}
                            <div className={`relative w-3 h-3 bg-kulanBlue dark:bg-blue-400 border border-white dark:border-slate-900 rounded-full z-10 shadow-md cursor-pointer transform transition duration-300 mx-auto ${isHovered ? 'scale-150 ring-4 ring-blue-200 dark:ring-blue-900' : 'hover:scale-125'}`}></div>

                            {/* POPUP / LABEL */}
                            <div className={labelClasses}>
                                {showTooltip ? (
                                    // RICH TOOLTIP (Database Data)
                                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 min-w-[220px] max-w-[280px] text-left animate-in fade-in zoom-in-95 duration-200 select-text cursor-auto">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm border-b border-gray-100 dark:border-gray-700 pb-2 flex justify-between items-center">
                                            <span>{getLoc(branchData, "name")}</span>
                                        </h4>

                                        {branchData.locations.length > 0 ? (
                                            <div className="space-y-3">
                                                {branchData.locations.slice(0, 1).map((loc: any) => (
                                                    <div key={loc.id} className="text-xs space-y-2">
                                                        <p className="text-gray-500 dark:text-gray-400 flex items-start gap-2 leading-relaxed">
                                                            <i className="fas fa-map-marker-alt mt-1 text-kulanBlue shrink-0"></i>
                                                            <span>{getLoc(loc, "address")}</span>
                                                        </p>
                                                        {loc.phones && (
                                                            <p className="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2 select-all">
                                                                <i className="fas fa-phone-alt text-kulanBlue text-[10px]"></i>
                                                                <a href={`tel:${loc.phones.split(',')[0].trim()}`} className="hover:text-blue-500 transition-colors">
                                                                    {loc.phones.split(',')[0]}
                                                                </a>
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                                {branchData.locations.length > 1 && (
                                                    <a href="/contacts" className="block text-[10px] text-blue-500 hover:text-blue-700 font-medium mt-1 text-center bg-blue-50 dark:bg-blue-900/30 py-1 rounded transition-colors">
                                                        Посмотреть все адреса ({branchData.locations.length})
                                                    </a>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">Нет данных об адресе</p>
                                        )}
                                    </div>
                                ) : (
                                    // STANDARD LABEL (Just Name) - Removed bg/border, purely text
                                    <span
                                        className={`block text-center text-xs ${isHead ? 'text-gray-900 dark:text-white font-black text-sm' : 'text-gray-700 dark:text-gray-300 font-bold'} drop-shadow-md shadow-white/50 dark:shadow-black/50`}
                                        style={{ textShadow: "0 1px 2px rgba(255,255,255,0.5)" }}
                                    >
                                        {t(city.labelKey)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
