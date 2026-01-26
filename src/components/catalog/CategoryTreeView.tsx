'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export type CategoryNode = {
    id: number;
    title: string;
    slug: string;
    parentId: number | null;
    children: CategoryNode[];
};

interface CategoryTreeViewProps {
    roots: CategoryNode[];
}

export function CategoryTreeView({ roots }: CategoryTreeViewProps) {
    const searchParams = useSearchParams();
    const activeSlug = searchParams.get('category');
    const { t } = useLanguage();

    const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

    const toggleExpand = (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newSet = new Set(expandedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedIds(newSet);
    };

    return (
        <div className="text-sm">
            <div className="mb-4">
                <Link
                    href="/catalog"
                    className={`block px-4 py-2.5 rounded-xl transition-all font-bold ${!activeSlug
                        ? 'bg-kulanBlue text-white shadow-lg shadow-blue-500/30'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-kulanBlue dark:hover:text-white'}`}
                >
                    {t('catalog_all_products')}
                </Link>
            </div>

            <div className="space-y-1">
                {roots.map(node => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        activeSlug={activeSlug}
                        expandedIds={expandedIds}
                        toggleExpand={toggleExpand}
                        level={0}
                    />
                ))}
            </div>
        </div>
    );
}

function TreeNode({
    node,
    activeSlug,
    expandedIds,
    toggleExpand,
    level
}: {
    node: CategoryNode,
    activeSlug: string | null,
    expandedIds: Set<number>,
    toggleExpand: (id: number, e: React.MouseEvent) => void,
    level: number
}) {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.has(node.id) || (activeSlug === node.slug) || checkChildActive(node, activeSlug);
    const isActive = activeSlug === node.slug;

    return (
        <div className="relative">
            <div className={`flex items-center group rounded-lg transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'}`}>
                {/* Expand Toggle or Leaf Icon */}
                {hasChildren && (
                    <button
                        onClick={(e) => toggleExpand(node.id, e)}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-kulanBlue dark:hover:text-white transition focus:outline-none z-10"
                    >
                        <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'} text-[10px]`}></i>
                    </button>
                )}
                {!hasChildren && (
                    <div className="w-8 flex justify-center items-center">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-kulanBlue' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                    </div>
                )}

                <Link
                    href={`/catalog?category=${node.slug}`}
                    className={`flex-1 py-1.5 pr-4 text-sm font-medium leading-tight transition-colors ${isActive ? 'text-kulanBlue font-bold' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'
                        }`}
                >
                    {node.title}
                </Link>
            </div>

            {/* Children with Lines */}
            {hasChildren && isExpanded && (
                <div className="ml-3 pl-3 border-l border-gray-100 dark:border-slate-800 space-y-1 mt-1">
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            activeSlug={activeSlug}
                            expandedIds={expandedIds}
                            toggleExpand={toggleExpand}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function checkChildActive(node: CategoryNode, activeSlug: string | null): boolean {
    if (!activeSlug) return false;
    if (node.slug === activeSlug) return true;
    for (const child of node.children) {
        if (checkChildActive(child, activeSlug)) return true;
    }
    return false;
}
