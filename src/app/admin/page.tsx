import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const productsCount = await prisma.product.count();
    const categoriesCount = await prisma.category.count();
    const brandsCount = await prisma.brand.count();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Обзор</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <Link href="/admin/products" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Всего товаров</h3>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-kulanBlue">
                            <i className="fas fa-box"></i>
                        </div>
                    </div>
                    <p className="text-4xl font-bold">{productsCount}</p>
                </Link>

                {/* Card 2 */}
                <Link href="/admin/categories" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Категории</h3>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <i className="fas fa-folder"></i>
                        </div>
                    </div>
                    <p className="text-4xl font-bold">{categoriesCount}</p>
                </Link>

                {/* Card 3 */}
                <Link href="/admin/brands" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Бренды</h3>
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <i className="fas fa-tag"></i>
                        </div>
                    </div>
                    <p className="text-4xl font-bold">{brandsCount}</p>
                </Link>
            </div>

            <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100 text-center">
                <h2 className="text-xl font-bold mb-4">Быстрые действия</h2>
                <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-6 py-3 bg-kulanBlue text-white rounded-xl hover:bg-blue-700 transition font-bold">
                    <i className="fas fa-plus"></i> Добавить товар
                </Link>
            </div>
        </div>
    );
}
