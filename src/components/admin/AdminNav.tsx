'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminNav() {
    return (
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
            <SidebarLink href="/admin" icon="fa-th-large" label="Дашборд" exact />

            <div className="pt-6 pb-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Каталог</div>
            <SidebarLink href="/admin/products" icon="fa-box" label="Товары" />
            <SidebarLink href="/admin/categories" icon="fa-layer-group" label="Категории" />
            <SidebarLink href="/admin/brands" icon="fa-tag" label="Бренды" />

            <div className="pt-6 pb-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Система</div>
            <SidebarLink href="/admin/users" icon="fa-users" label="Пользователи" />

            <div className="pt-6 pb-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Контент</div>
            <SidebarLink href="/admin/stats" icon="fa-chart-bar" label="Статистика" />
            <SidebarLink href="/admin/branches" icon="fa-map-signs" label="Филиалы" />
        </nav>
    );
}

function SidebarLink({ href, icon, label, exact = false }: { href: string, icon: string, label: string, exact?: boolean }) {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm group ${isActive
                ? 'bg-kulanBlue text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-500 hover:bg-gray-50 hover:text-kulanBlue'
                }`}
        >
            <span className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-white group-hover:text-kulanBlue'
                }`}>
                <i className={`fas ${icon}`}></i>
            </span>
            {label}
        </Link>
    );
}
