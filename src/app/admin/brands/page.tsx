import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteBrand } from '@/app/actions/brand';

export const dynamic = 'force-dynamic';

export default async function BrandsList() {
    const brands = await prisma.brand.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Бренды</h1>
                <Link href="/admin/brands/new" className="px-6 py-3 bg-kulanBlue text-white rounded-xl hover:bg-blue-700 transition font-bold text-sm shadow-md shadow-blue-500/30">
                    + Добавить
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 text-sm font-bold text-gray-500">Лого</th>
                            <th className="p-4 text-sm font-bold text-gray-500">Название</th>
                            <th className="p-4 text-sm font-bold text-gray-500">Slug</th>
                            <th className="p-4 text-right text-sm font-bold text-gray-500">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {brands.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">Нет брендов.</td>
                            </tr>
                        ) : brands.map((brand) => (
                            <tr key={brand.id} className="hover:bg-gray-50 transition">
                                <td className="p-4">
                                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                        {brand.logo ? (
                                            <Image src={brand.logo} alt={brand.name} fill className="object-contain p-1" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <i className="fas fa-tag"></i>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 font-bold text-gray-900">{brand.name}</td>
                                <td className="p-4 text-sm text-gray-500 font-mono">{brand.slug}</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <Link href={`/admin/brands/${brand.id}`} className="text-kulanBlue hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition inline-block">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <DeleteButton id={brand.id} deleteAction={deleteBrand} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
