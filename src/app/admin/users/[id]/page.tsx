import { prisma } from '@/lib/prisma';
import { updateUser } from '@/app/actions/user';
import Link from 'next/link';

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    if (!user) return <div className="text-gray-900 dark:text-white">Пользователь не найден</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Редактировать пользователя</h1>

            <form action={updateUser} className="bg-white dark:bg-[#161b2c] rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 space-y-6">
                <input type="hidden" name="id" value={user.id} />

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Имя</label>
                    <input
                        name="name"
                        defaultValue={user.name || ''}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                        placeholder="Имя Фамилия"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                        name="email"
                        type="email"
                        defaultValue={user.email}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                        placeholder="example@mail.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Новый пароль (оставьте пустым, если не меняете)</label>
                    <input
                        name="password"
                        type="password"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                        placeholder="••••••••"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Роль</label>
                    <select
                        name="role"
                        defaultValue={user.role}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                    >
                        <option value="editor">Редактор (Контент-менеджер)</option>
                        <option value="admin">Администратор (Полный доступ)</option>
                    </select>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/users" className="px-6 py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition">
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
