import { createBrand } from '@/app/actions/brand';
import Link from 'next/link';

export default function NewBrandPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Новый бренд</h1>

            <form action={createBrand} className="bg-white dark:bg-[#161b2c] rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Название</label>
                    <input
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                        placeholder="Например: Mobil 1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Логотип</label>
                    <input
                        name="logo"
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-kulanBlue hover:file:bg-blue-100 cursor-pointer"
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/brands" className="px-6 py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition">
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
