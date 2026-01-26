import { prisma } from '@/lib/prisma';
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = 'force-dynamic';

async function getSettings() {
    let settings = await prisma.siteSetting.findMany();

    // Seed metrics if empty
    if (settings.length === 0) {
        const defaults = [
            { key: 'stat_years', value: '29', label: 'Лет на рынке' },
            { key: 'stat_clients', value: '10000+', label: 'Клиентов' },
            { key: 'stat_brands', value: '100+', label: 'Брендов' },
            { key: 'stat_branches', value: '14', label: 'Филиалов' },
            { key: 'stat_employees', value: '550+', label: 'Сотрудников' }
        ];

        for (const d of defaults) await prisma.siteSetting.create({ data: d });
        settings = await prisma.siteSetting.findMany();
    }

    const settingsMap: Record<string, string> = {};
    settings.forEach(s => settingsMap[s.key] = s.value);
    return settingsMap;
}

export default async function StatsPage() {
    const settings = await getSettings();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Статистика</h1>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-kulanBlue">
                        <i className="fas fa-chart-bar"></i>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold">Показатели на главной</h2>
                        <p className="text-sm text-gray-500">Эти цифры отображаются в секции статистики на главной странице.</p>
                    </div>
                </div>
                <SettingsForm settings={settings} />
            </div>
        </div>
    );
}
