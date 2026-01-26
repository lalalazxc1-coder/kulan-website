'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/actions/auth';
import Image from 'next/image';

export default function LoginPage() {
    const [state, action, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-4">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/logo.C6ZGBGWf.png"
                            alt="Logo"
                            width={180}
                            height={50}
                            className="object-contain"
                        />
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white font-heading">
                        Вход в админ-панель
                    </h2>
                </div>

                <form action={action} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-kulanBlue focus:border-kulanBlue transition"
                                placeholder="admin@adkulan.kz"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Пароль
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-kulanBlue focus:border-kulanBlue transition"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm text-center font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-kulanBlue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kulanBlue disabled:opacity-50 transition"
                    >
                        {isPending ? 'Вход...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
}
