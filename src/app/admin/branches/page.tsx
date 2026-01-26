import { prisma } from '@/lib/prisma';
import { BranchesManager } from "@/components/admin/BranchesManager";

export const dynamic = 'force-dynamic';

export default async function BranchesPage() {
    // Seed if empty
    const count = await prisma.branch.count();
    if (count === 0) {
        // Head Office
        const head = await prisma.branch.create({
            data: {
                slug: 'head_office',
                name_ru: 'Головной офис',
                name_kk: 'Бас кеңсе',
                name_en: 'Head Office',
                sortOrder: 0
            }
        });
        await prisma.branchLocation.create({
            data: {
                branchId: head.id,
                type: 'head_office',
                name_ru: 'Главный офис', name_kk: 'Бас кеңсе', name_en: 'Main Office',
                address_ru: 'Казахстан, Алматы, проспект Назарбаева, 187Б, бизнес центр «STAR», 6-этаж',
                address_kk: 'Қазақстан, Алматы қ., Назарбаев даңғылы, 187Б, «STAR» бизнес орталығы, 6-қабат',
                address_en: 'Kazakhstan, Almaty, Nazarbayev Avenue, 187B, STAR Business Center, 6th floor',
                phones: '+7 (727) 273-02-02',
                emails: 'info@kulanoil.kz'
            }
        });

        // Almaty (Example)
        const almaty = await prisma.branch.create({
            data: {
                slug: 'almaty',
                name_ru: 'Алматы', name_kk: 'Алматы', name_en: 'Almaty',
                sortOrder: 1
            }
        });
        await prisma.branchLocation.create({
            data: {
                branchId: almaty.id,
                type: 'office',
                name_ru: 'Офис', name_kk: 'Кеңсе', name_en: 'Office',
                address_ru: 'ул. Немировича-Данченко, 18',
                address_kk: 'Немирович-Данченко көш., 18',
                address_en: '18 Nemirovich-Danchenko St.',
                phones: '',
                emails: ''
            }
        });
    }

    const branches = await prisma.branch.findMany({
        include: { locations: { orderBy: { sortOrder: 'asc' } } },
        orderBy: { sortOrder: 'asc' }
    });

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Филиалы</h1>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <i className="fas fa-map-marked-alt"></i>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold">Управление филиалами (Городами и Точками)</h2>
                        <p className="text-sm text-gray-500">Добавляйте города и точки (офисы/склады) внутри них. Все данные мультиязычные.</p>
                    </div>
                </div>
                <BranchesManager branches={branches} />
            </div>
        </div>
    );
}
