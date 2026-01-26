'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CategoryTreeView, CategoryNode } from '@/components/catalog/CategoryTreeView';
import { useLanguage } from '@/context/LanguageContext';
import { Product, Category, Brand } from '@prisma/client';

// Extended product type with relations
type ProductWithRelations = Product & {
    category: Category | null;
    brand: Brand | null;
};

interface CatalogViewProps {
    products: ProductWithRelations[];
    categoryTree: CategoryNode[];
    currentCategorySlug?: string;
    searchQuery: string;
    // We pass static titles as fallback or primary identifiers
    // But we will use translations for standard UI elements
}

export function CatalogView({
    products,
    categoryTree,
    currentCategorySlug,
    searchQuery
}: CatalogViewProps) {
    const { t } = useLanguage();

    // Determine Dynamic Title based on props + translation possibilities
    // If it's a specific category, we usually show its name (from DB). Translations might not cover dynamic DB content.
    // So we keep category names as is (or if you have multi-lang DB, picking that).
    // But "Search Results" or "All Products" can be translated.

    let activeCategoryTitle = t('catalog_all_products');
    if (currentCategorySlug) {
        // Find title from tree? Or passed from server? 
        // For simplicity, let's look it up in the tree (recursively) strict match
        const findCatTitle = (nodes: CategoryNode[]): string | undefined => {
            for (const node of nodes) {
                if (node.slug === currentCategorySlug) return node.title;
                if (node.children) {
                    const found = findCatTitle(node.children);
                    if (found) return found;
                }
            }
            return undefined;
        };
        const foundTitle = findCatTitle(categoryTree);
        if (foundTitle) activeCategoryTitle = foundTitle;
    }
    if (searchQuery) {
        activeCategoryTitle = `${t('catalog_search_results')}: "${searchQuery}"`;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Sidebar: Categories */}
            <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="bg-white dark:bg-[#161b2c] rounded-2xl p-5 border border-gray-200 dark:border-slate-800/50 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar shadow-xl transition-colors">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        <i className="fas fa-filter text-kulanBlue text-xs"></i>
                        {t('catalog_categories')}
                    </h3>
                    <CategoryTreeView roots={categoryTree} />
                </div>
            </aside>

            {/* Right Content */}
            <div className="flex-1 min-w-0">
                {/* Search Bar */}
                <div className="mb-6">
                    <form action="/catalog" method="GET" className="relative w-full max-w-2xl">
                        <input
                            name="q"
                            defaultValue={searchQuery}
                            placeholder={t('catalog_search_placeholder')}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#161b2c] rounded-xl border border-gray-200 dark:border-slate-800 text-sm focus:border-kulanBlue focus:ring-1 focus:ring-kulanBlue transition outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                        />
                        <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm"></i>
                        {currentCategorySlug && <input type="hidden" name="category" value={currentCategorySlug} />}
                    </form>
                </div>

                {/* Title & Count */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">{activeCategoryTitle}</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('catalog_found')}: {products.length}</p>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-[#161b2c] rounded-2xl p-10 text-center border border-gray-200 dark:border-slate-800/50 transition-colors">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-600">
                            <i className="fas fa-search text-2xl"></i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t('catalog_nothing_found')}</h3>
                        <p className="text-sm text-gray-500 mb-6">{t('catalog_try_change_query')}</p>
                        <Link
                            href="/catalog"
                            className="inline-block px-6 py-2 bg-kulanBlue text-white text-sm rounded-lg font-bold hover:bg-blue-600 transition"
                        >
                            {t('catalog_reset')}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
