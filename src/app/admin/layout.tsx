import Link from 'next/link';
import Image from 'next/image';
import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white flex font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20 shadow-xl shadow-gray-200/50">
                <div className="p-8 border-b border-gray-100 flex flex-col items-center flex-shrink-0">
                    <Link href="/admin">
                        <Image
                            src="/logo.C6ZGBGWf.png"
                            alt="Kulan Oil"
                            width={160}
                            height={45}
                            className="h-10 w-auto object-contain mb-2"
                        />
                    </Link>
                    <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-1">Admin Panel</span>
                </div>

                {/* Navigation (Client Component) */}
                <AdminNav />

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
                    <form action={async () => {
                        'use server';
                        const { logoutAction } = await import('@/app/actions/logout');
                        await logoutAction();
                    }}>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all text-sm font-bold">
                            <i className="fas fa-sign-out-alt"></i> Выйти
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <Link href="/" className="text-xs text-gray-400 hover:text-kulanBlue flex items-center justify-center gap-2 transition font-medium">
                            <i className="fas fa-external-link-alt text-[10px]"></i> Перейти на сайт
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-8 lg:p-12">

                <div className="max-w-7xl mx-auto animate-fadeIn">
                    {children}
                </div>
            </main>
        </div>
    );
}
