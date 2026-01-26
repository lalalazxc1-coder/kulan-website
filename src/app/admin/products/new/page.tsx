import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';

export default async function NewProductPage() {
    const categories = await prisma.category.findMany({ orderBy: { title: 'asc' } });
    const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/products" className="text-gray-500 hover:text-kulanBlue dark:hover:text-blue-400 transition">
                    <i className="fas fa-arrow-left"></i> Назад
                </Link>
                <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">Новый товар</h1>
            </div>

            <ProductForm categories={categories} brands={brands} />
        </div>
    );
}
