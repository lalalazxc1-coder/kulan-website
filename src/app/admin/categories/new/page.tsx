import { prisma } from '@/lib/prisma';
import { createCategory } from '@/app/actions/category';
import Link from 'next/link';

export default async function NewCategoryPage() {
    const categories = await prisma.category.findMany({ orderBy: { title: 'asc' } });

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Новая категория</h1>

            <form action={createCategory} className="bg-white dark:bg-[#161b2c] rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Название</label>
                    <input
                        name="title"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                        placeholder="Например: Моторные масла"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Родительская категория</label>
                    <select
                        name="parentId"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                    >
                        <option value="">-- Без родителя (Корневая) --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/categories" className="px-6 py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition">
                        Отмена
                    </Link>
                    <button type="submit" className="bg-kulanBlue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition">
                        Создать
                    </button>
                </div>
            </form>
        </div>
    );
}
