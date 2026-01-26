import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id: parseInt(id) }
    });

    const categories = await prisma.category.findMany({ orderBy: { title: 'asc' } });
    const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } });

    if (!product) {
        return (
            <div className="text-center py-20 text-gray-900 dark:text-white">
                <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
                <Link href="/admin/products" className="text-kulanBlue dark:text-blue-400 hover:underline">
                    Вернуться к списку
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/products" className="text-gray-500 hover:text-kulanBlue dark:hover:text-blue-400 transition">
                    <i className="fas fa-arrow-left"></i> Назад
                </Link>
                <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">Редактирование товара</h1>
            </div>

            <ProductForm
                initialData={product}
                categories={categories}
                brands={brands}
            />
        </div>
    );
}
