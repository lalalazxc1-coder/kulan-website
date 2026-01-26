'use client';

import { useState } from 'react';
import { createBranch, updateBranch, deleteBranch, createLocation, updateLocation, deleteLocation } from '@/app/actions/branches';
import { Branch, BranchLocation } from '@prisma/client';

type BranchWithLocations = Branch & { locations: BranchLocation[] };

export function BranchesManager({ branches }: { branches: BranchWithLocations[] }) {
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
    const [editingLocation, setEditingLocation] = useState<BranchLocation | null>(null);
    const [addingLocationToBranchId, setAddingLocationToBranchId] = useState<number | null>(null);
    const [isCreatingBranch, setIsCreatingBranch] = useState(false);

    // --- Branch Handlers ---
    const handleSaveBranch = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const payload = {
            slug: data.get('slug') as string,
            name_ru: data.get('name_ru') as string,
            name_kk: data.get('name_kk') as string,
            name_en: data.get('name_en') as string,
            sortOrder: parseInt(data.get('sortOrder') as string) || 0
        };

        if (editingBranch) {
            await updateBranch(editingBranch.id, payload);
            setEditingBranch(null);
        } else {
            await createBranch(payload);
            setIsCreatingBranch(false);
        }
    };

    const handleDeleteBranch = async (id: number) => {
        if (confirm('Удалить город и ВСЕ его локации?')) await deleteBranch(id);
    };

    // --- Location Handlers ---
    const handleSaveLocation = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const phones = data.get('phones') as string;
        const emails = data.get('emails') as string;

        const payload = {
            branchId: addingLocationToBranchId || editingLocation!.branchId,
            type: data.get('type') as string,
            name_ru: data.get('name_ru') as string,
            name_kk: data.get('name_kk') as string,
            name_en: data.get('name_en') as string,
            address_ru: data.get('address_ru') as string,
            address_kk: data.get('address_kk') as string,
            address_en: data.get('address_en') as string,
            phones: phones,
            emails: emails,
            mapLink: data.get('mapLink') as string,
            sortOrder: parseInt(data.get('sortOrder') as string) || 0
        };

        if (editingLocation) {
            await updateLocation(editingLocation.id, payload);
            setEditingLocation(null);
        } else {
            await createLocation(payload);
            setAddingLocationToBranchId(null);
        }
    };

    const handleDeleteLocation = async (id: number) => {
        if (confirm('Удалить локацию?')) await deleteLocation(id);
    };

    return (
        <div className="space-y-6">
            <button onClick={() => setIsCreatingBranch(true)} className="px-4 py-2 bg-kulanBlue text-white rounded-lg hover:bg-blue-700 transition font-bold shadow-md">
                + Добавить Город/Филиал
            </button>

            {/* Branch Editor Modal */}
            {(isCreatingBranch || editingBranch) && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">{editingBranch ? 'Редактировать Город' : 'Новый Город'}</h3>
                        <form onSubmit={handleSaveBranch} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Slug (ID города, англ)</label>
                                <input name="slug" defaultValue={editingBranch?.slug} required className="w-full border p-2 rounded" placeholder="almaty" />
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <input name="name_ru" defaultValue={editingBranch?.name_ru} placeholder="Название (RU)" required className="w-full border p-2 rounded" />
                                <input name="name_kk" defaultValue={editingBranch?.name_kk} placeholder="Название (KZ)" required className="w-full border p-2 rounded" />
                                <input name="name_en" defaultValue={editingBranch?.name_en} placeholder="Название (EN)" required className="w-full border p-2 rounded" />
                            </div>
                            <input name="sortOrder" type="number" defaultValue={editingBranch?.sortOrder || 0} placeholder="Сортировка" className="w-full border p-2 rounded" />

                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => { setIsCreatingBranch(false); setEditingBranch(null); }} className="px-4 py-2 bg-gray-200 rounded text-gray-700">Отмена</button>
                                <button type="submit" className="px-4 py-2 bg-kulanBlue text-white rounded hover:bg-blue-700">Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Location Editor Modal */}
            {(addingLocationToBranchId || editingLocation) && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-2xl shadow-2xl my-8">
                        <h3 className="text-xl font-bold mb-4">{editingLocation ? 'Редактировать Локацию' : 'Новая Локация'}</h3>
                        <form onSubmit={handleSaveLocation} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Тип</label>
                                    <select name="type" defaultValue={editingLocation?.type || 'office'} className="w-full border p-2 rounded">
                                        <option value="office">Офис</option>
                                        <option value="warehouse">Склад</option>
                                        <option value="head_office">Головной офис</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Сортировка</label>
                                    <input name="sortOrder" type="number" defaultValue={editingLocation?.sortOrder || 0} className="w-full border p-2 rounded" />
                                </div>
                            </div>

                            <div className="p-3 bg-white rounded border border-gray-100">
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Название (Опц)</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <input name="name_ru" defaultValue={editingLocation?.name_ru || ''} placeholder="Название (RU)" className="border p-2 rounded" />
                                    <input name="name_kk" defaultValue={editingLocation?.name_kk || ''} placeholder="Название (KZ)" className="border p-2 rounded" />
                                    <input name="name_en" defaultValue={editingLocation?.name_en || ''} placeholder="Название (EN)" className="border p-2 rounded" />
                                </div>
                            </div>

                            <div className="p-3 bg-white rounded border border-gray-100">
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Адрес</label>
                                <div className="space-y-2">
                                    <input name="address_ru" defaultValue={editingLocation?.address_ru} placeholder="Адрес (RU)" required className="w-full border p-2 rounded" />
                                    <input name="address_kk" defaultValue={editingLocation?.address_kk} placeholder="Адрес (KZ)" required className="w-full border p-2 rounded" />
                                    <input name="address_en" defaultValue={editingLocation?.address_en} placeholder="Адрес (EN)" required className="w-full border p-2 rounded" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Телефоны (через запятую)</label>
                                    <textarea name="phones" defaultValue={editingLocation?.phones || ''} className="w-full border p-2 rounded h-20" placeholder="+7 (700)..., +7 (701)..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Emails (через запятую)</label>
                                    <textarea name="emails" defaultValue={editingLocation?.emails || ''} className="w-full border p-2 rounded h-20" placeholder="sales@kulan.kz..."></textarea>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-bold mb-1">Ссылка на карту (2GIS / Google)</label>
                                    <input name="mapLink" defaultValue={editingLocation?.mapLink || ''} placeholder="https://go.2gis.com/..." className="w-full border p-2 rounded" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => { setAddingLocationToBranchId(null); setEditingLocation(null); }} className="px-4 py-2 bg-gray-200 rounded text-gray-700">Отмена</button>
                                <button type="submit" className="px-4 py-2 bg-kulanBlue text-white rounded hover:bg-blue-700">Сохранить</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* LIST */}
            <div className="space-y-6">
                {branches.map(branch => (
                    <div key={branch.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                            <div>
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    {branch.name_ru}
                                    <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded">{branch.slug}</span>
                                </h3>
                                <p className="text-xs text-gray-400">{branch.name_kk} / {branch.name_en}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setEditingBranch(branch)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><i className="fas fa-edit"></i></button>
                                <button onClick={() => handleDeleteBranch(branch.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><i className="fas fa-trash"></i></button>
                            </div>
                        </div>

                        <div className="p-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500">
                                        <th className="pb-2 pl-2">Тип</th>
                                        <th className="pb-2">Название / Адрес</th>
                                        <th className="pb-2">Контакты</th>
                                        <th className="pb-2 text-right">Действия</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {branch.locations.map(loc => (
                                        <tr key={loc.id} className="hover:bg-white/50">
                                            <td className="py-3 pl-2 align-top">
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-bold 
                                                    ${loc.type === 'head_office' ? 'bg-purple-100 text-purple-700' :
                                                        loc.type === 'warehouse' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {loc.type === 'office' ? 'Офис' : loc.type === 'warehouse' ? 'Склад' : 'Головной'}
                                                </span>
                                            </td>
                                            <td className="py-3 align-top">
                                                {loc.name_ru && <div className="font-bold text-gray-900">{loc.name_ru}</div>}
                                                <div className="text-gray-600">{loc.address_ru}</div>
                                                <div className="text-xs text-gray-400 mt-1">{loc.address_en}</div>
                                            </td>
                                            <td className="py-3 align-top">
                                                {loc.phones && <div className="mb-1"><i className="fas fa-phone text-xs text-gray-400 w-4"></i> {loc.phones}</div>}
                                                {loc.emails && <div><i className="fas fa-envelope text-xs text-gray-400 w-4"></i> {loc.emails}</div>}
                                            </td>
                                            <td className="py-3 align-top text-right">
                                                <button onClick={() => setEditingLocation(loc)} className="text-blue-600 hover:underline mr-3">Изм.</button>
                                                <button onClick={() => handleDeleteLocation(loc.id)} className="text-red-500 hover:underline">Уд.</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {branch.locations.length === 0 && (
                                        <tr><td colSpan={4} className="py-4 text-center text-gray-400">Нет локаций</td></tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="mt-4 border-t border-gray-100 pt-4">
                                <button onClick={() => setAddingLocationToBranchId(branch.id)} className="text-sm font-bold text-kulanBlue hover:underline flex items-center gap-1">
                                    <i className="fas fa-plus-circle"></i> Добавить точку
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
