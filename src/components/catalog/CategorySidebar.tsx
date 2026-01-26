"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Category {
    id: string;
    title: string;
    slug: string;
    parent?: { id: string; slug: string } | string | null; // ID or object depending on depth
}

interface CategorySidebarProps {
    categories: Category[];
}

export function CategorySidebar({ categories }: CategorySidebarProps) {
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category");

    // Simple grouping: Top level vs Children
    // This assumes only 1 level deep for simplicity in first iteration, 
    // or we render flat with indentation if we can determine level.
    // Better: Render all top-level, and show children if active or expand.

    // Let's filter top level categories (no parent)
    const topLevel = categories.filter(c => !c.parent);

    // Function to get children of a category
    const getChildren = (parentId: string) => {
        return categories.filter(c => {
            // Handle both object populate and raw ID
            if (c.parent && typeof c.parent === 'object' && 'id' in c.parent) {
                return c.parent.id === parentId;
            }
            return c.parent === parentId;
        });
    };

    const renderCategory = (cat: Category, level = 0) => {
        const isActive = activeCategory === cat.slug;
        const children = getChildren(cat.id);
        const hasChildren = children.length > 0;
        const isParentActive = children.some(c => c.slug === activeCategory);
        const isOpen = isActive || isParentActive; // Auto-expand if child active?

        return (
            <div key={cat.id} className="mb-1">
                <Link
                    href={`/catalog?category=${cat.slug}`}
                    className={`block py-2 px-3 rounded-lg text-sm transition-colors ${isActive
                            ? "bg-kulanBlue/10 text-kulanBlue dark:bg-blue-900/30 dark:text-blue-300 font-bold"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                    style={{ marginLeft: `${level * 12}px` }}
                >
                    {cat.title}
                </Link>
                {/* Always render children if they exist, or only if open? 
                    "Full setting" implies visibility. Let's show all for now or indentation style.
                    A simple tree is best.
                */}
                {children.map(child => renderCategory(child, level + 1))}
            </div>
        );
    };

    return (
        <aside className="w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                Категории
            </h3>

            <div className="space-y-1">
                <Link
                    href="/catalog"
                    className={`block py-2 px-3 rounded-lg text-sm font-bold transition-colors ${!activeCategory
                            ? "bg-kulanBlue/10 text-kulanBlue dark:bg-blue-900/30 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                        }`}
                >
                    Все товары
                </Link>
                {/* Separator */}
                <div className="h-px bg-gray-100 dark:bg-slate-700 my-2"></div>

                {topLevel.length > 0 ? (
                    topLevel.map(cat => renderCategory(cat))
                ) : (
                    <div className="text-sm text-gray-400 italic px-3">
                        Категорий пока нет
                    </div>
                )}

                {/* Fallback for orphans if hierarchy is broken? No, just stick to topLevel */}
            </div>
        </aside>
    );
}
