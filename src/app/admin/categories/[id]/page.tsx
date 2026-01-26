import { prisma } from '@/lib/prisma';
import { updateCategory } from '@/app/actions/category';
import Link from 'next/link';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });

    // Fetch potential parents (exclude itself to avoid cycles is ideal, but let's just fetch all for now)
    const allCategories = await prisma.category.findMany({
        where: { NOT: { id: parseInt(id) } }, // Simple cycle prevention: don't show self
        orderBy: { title: 'asc' }
    });

    if (!category) return <div className="text-gray-900 dark:text-white">Категория не найдена</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Редактировать категорию</h1>

            <form action={updateCategory} className="bg-white dark:bg-[#161b2c] rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 space-y-6">
                <input type="hidden" name="id" value={category.id} />

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Название</label>
                    <input
                        name="title"
                        defaultValue={category.title}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                        placeholder="Например: Моторные масла"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Родительская категория</label>
                    <select
                        name="parentId"
                        defaultValue={category.parentId || ''}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                    >
                        <option value="">-- Без родителя (Корневая) --</option>
                        {allCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/categories" className="px-6 py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition">
                        Отмена
                    </Link>
                    <button type="submit" className="bg-kulanBlue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition">
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
}
