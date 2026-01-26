import { prisma } from '@/lib/prisma';
import { updateBrand } from '@/app/actions/brand';
import Link from 'next/link';
import Image from 'next/image';

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const brand = await prisma.brand.findUnique({ where: { id: parseInt(id) } });

    if (!brand) return <div className="text-gray-900 dark:text-white">Бренд не найден</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Редактировать бренд</h1>

            <form action={updateBrand} className="bg-white dark:bg-[#161b2c] rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 space-y-6">
                <input type="hidden" name="id" value={brand.id} />

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Название</label>
                    <input
                        name="name"
                        defaultValue={brand.name}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0f111a] text-gray-900 dark:text-white outline-none focus:border-kulanBlue transition"
                        placeholder="Например: Mobil 1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Логотип (обновить)</label>

                    {brand.logo && (
                        <div className="mb-4">
                            <div className="w-24 h-24 relative bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-2">
                                <Image src={brand.logo} alt="Current Logo" fill className="object-contain" />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Текущий логотип</p>
                        </div>
                    )}

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
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    );
}
