import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteCategory } from '@/app/actions/category';

export const dynamic = 'force-dynamic';

export default async function CategoriesList() {
    const categories = await prisma.category.findMany({
        include: { parent: true },
        orderBy: { title: 'asc' }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Категории</h1>
                <Link href="/admin/categories/new" className="px-6 py-3 bg-kulanBlue text-white rounded-xl hover:bg-blue-700 transition font-bold text-sm shadow-md shadow-blue-500/30">
                    + Добавить
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 text-sm font-bold text-gray-500">Название</th>
                            <th className="p-4 text-sm font-bold text-gray-500">Родитель</th>
                            <th className="p-4 text-sm font-bold text-gray-500">Slug</th>
                            <th className="p-4 text-right text-sm font-bold text-gray-500">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">Нет категорий.</td>
                            </tr>
                        ) : categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-bold text-gray-900">{cat.title}</td>
                                <td className="p-4 text-sm text-gray-500">
                                    {cat.parent ? cat.parent.title : '-'}
                                </td>
                                <td className="p-4 text-sm text-gray-500 font-mono">{cat.slug}</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <Link href={`/admin/categories/${cat.id}`} className="text-kulanBlue hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition inline-block">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <DeleteButton id={cat.id} deleteAction={deleteCategory} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
