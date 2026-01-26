"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Имитация отправки
        setTimeout(() => {
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false); // Reset for next time
            }, 2000);
        }, 1000);
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div
                className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden bg-white dark:bg-slate-800 transition-colors transform animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                            Оставить заявку
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    {!isSuccess ? (
                        <>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                                Заполните форму, и наш менеджер свяжется с вами в ближайшее время.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1 ml-1">
                                        Ваше имя
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:border-kulanBlue focus:ring-2 focus:ring-kulanBlue/20 outline-none transition bg-white/50 dark:bg-slate-700/50 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1 ml-1">
                                        Номер телефона
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:border-kulanBlue focus:ring-2 focus:ring-kulanBlue/20 outline-none transition bg-white/50 dark:bg-slate-700/50 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1 ml-1">
                                        Сообщение
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 focus:border-kulanBlue focus:ring-2 focus:ring-kulanBlue/20 outline-none transition bg-white/50 dark:bg-slate-700/50 dark:text-white resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-kulanBlue text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg transform active:scale-95 mt-4"
                                >
                                    Отправить заявку
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8 animate-fade-in">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                <i className="fas fa-check"></i>
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white">
                                Спасибо! Ваша заявка принята.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
