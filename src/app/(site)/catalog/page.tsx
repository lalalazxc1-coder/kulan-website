import { prisma } from '@/lib/prisma';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Category, Prisma } from '@prisma/client';
import { CategoryNode } from '@/components/catalog/CategoryTreeView';
import { CatalogView } from '@/components/catalog/CatalogView';
import { FloatingControls } from "@/components/FloatingControls";

export const dynamic = 'force-dynamic';

// Helper: Build Tree
function buildCategoryTree(categories: Category[]): CategoryNode[] {
    const map = new Map<number, CategoryNode>();
    const roots: CategoryNode[] = [];
    categories.forEach(cat => map.set(cat.id, { ...cat, children: [] }));
    categories.forEach(cat => {
        const node = map.get(cat.id)!;
        if (cat.parentId && map.has(cat.parentId)) {
            map.get(cat.parentId)!.children.push(node);
        } else {
            roots.push(node);
        }
    });
    return roots;
}

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ category?: string, q?: string }> }) {
    const params = await searchParams;
    const currentCategorySlug = params.category;
    const searchQuery = params.q || '';

    // 1. Data Fetching
    const allCategories = await prisma.category.findMany({ orderBy: { title: 'asc' } });
    const categoryTree = buildCategoryTree(allCategories);

    // 2. Resolve Active Category/Search logic for Filtering (Server Side)
    let categoryId: number | undefined;

    if (currentCategorySlug) {
        const cat = allCategories.find(c => c.slug === currentCategorySlug);
        if (cat) {
            categoryId = cat.id;
        }
    }


    // 3. Products - Build filter with proper Prisma types
    const whereClause: Prisma.ProductWhereInput = {};
    if (categoryId) {
        // Recursive children ids
        const getDescendantIds = (pid: number): number[] => {
            const kids = allCategories.filter(c => c.parentId === pid);
            return [pid, ...kids.flatMap(k => getDescendantIds(k.id))];
        };
        whereClause.categoryId = { in: getDescendantIds(categoryId) };
    }
    if (searchQuery) {
        whereClause.OR = [
            { name: { contains: searchQuery } },
            { article: { contains: searchQuery } },
            { slug: { contains: searchQuery } }
        ];
    }


    const products = await prisma.product.findMany({
        where: whereClause,
        include: { category: true, brand: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f111a] font-sans text-gray-900 dark:text-gray-200 transition-colors duration-300">
            <ParticleBackground />
            <FloatingControls />
            <Header />

            <main className="flex-grow pt-24 pb-12 relative z-10 container mx-auto px-4 lg:px-6">
                <CatalogView
                    products={products}
                    categoryTree={categoryTree}
                    currentCategorySlug={currentCategorySlug}
                    searchQuery={searchQuery}
                />
            </main>

            <Footer />
        </div>
    );
}
