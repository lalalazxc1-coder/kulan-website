import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteProduct } from '@/app/actions/product';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
            brand: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-heading text-gray-900">Товары</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-kulanBlue text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-900 transition flex items-center gap-2 shadow-lg shadow-blue-500/30"
                >
                    <i className="fas fa-plus"></i> Добавить
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Фото</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Название</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Категория</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Бренд</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {product.image ? (
                                        <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                            <Image src={product.image} alt="" fill className="object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200">
                                            <i className="fas fa-image"></i>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-bold text-gray-900">{product.name}</div>
                                    {product.article && <div className="text-xs text-gray-500">Арт: {product.article}</div>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                    {product.category?.title || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                    {product.brand?.name || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                                    <Link href={`/admin/products/${product.id}`} className="text-kulanBlue hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition inline-block">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <DeleteButton id={product.id} deleteAction={deleteProduct} />
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    Товаров пока нет
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
