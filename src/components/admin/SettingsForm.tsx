'use client';

import { updateSiteSettings } from "@/app/actions/settings";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="px-6 py-2 bg-kulanBlue text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {pending ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
    );
}

export function SettingsForm({ settings }: { settings: Record<string, string> }) {
    return (
        <form action={updateSiteSettings} className="space-y-6 max-w-xl">
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-bold mb-2">Лет на рынке</label>
                    <input name="stat_years" defaultValue={settings.stat_years || "29"} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Клиентов</label>
                    <input name="stat_clients" defaultValue={settings.stat_clients || "10000+"} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Брендов</label>
                    <input name="stat_brands" defaultValue={settings.stat_brands || "100+"} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Филиалов</label>
                    <input name="stat_branches" defaultValue={settings.stat_branches || "14"} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Сотрудников</label>
                    <input name="stat_employees" defaultValue={settings.stat_employees || "550+"} className="w-full px-4 py-2 border rounded-lg" />
                </div>
            </div>
            <SubmitButton />
        </form>
    );
}
