"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { ProductWithCategoryAndBrand } from "@/types";

interface ProductCardProps {
    product: ProductWithCategoryAndBrand;
}

export function ProductCard({ product }: ProductCardProps) {
    const { t } = useLanguage();
    const imageUrl = product.image; // Now it's just a string path
    const brandName = product.brand?.name;

    return (
        <Link
            href={`/catalog/${product.slug}`}
            className="group bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-kulanBlue/10 transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-slate-700/50 relative"
        >
            {/* Discount/New Badge (Placeholder) */}
            <div className="absolute top-4 left-4 z-10"></div>

            {/* Image Container - Always White to blend with JPGs */}
            <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center p-6 overflow-hidden">
                {imageUrl ? (
                    <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                ) : (
                    <div className="text-gray-200">
                        <i className="fas fa-image text-5xl"></i>
                    </div>
                )}

                {/* Hover Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                {brandName && (
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {brandName}
                    </p>
                )}

                <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-kulanBlue transition-colors line-clamp-2">
                    {product.name}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-slate-700 text-gray-400">
                    <span className="text-xs font-bold hover:text-kulanBlue transition-colors">
                        {t('card_details')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-700/50 flex items-center justify-center text-kulanBlue dark:text-blue-400 group-hover:bg-kulanBlue group-hover:text-white transition-all transform group-hover:translate-x-1">
                        <i className="fas fa-arrow-right text-xs"></i>
                    </div>
                </div>
            </div>
        </Link>
    );
}
