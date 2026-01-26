'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
    id: number;
    deleteAction: (id: number) => Promise<{ success?: boolean; error?: string }>;
}

export function DeleteButton({ id, deleteAction }: DeleteButtonProps) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Вы уверены, что хотите удалить этот элемент?')) return;

        setIsPending(true);
        const res = await deleteAction(id);

        if (res.error) {
            alert(res.error);
        } else {
            router.refresh(); // Refresh current route
        }
        setIsPending(false);
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition disabled:opacity-50"
            title="Удалить"
        >
            {isPending ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-trash"></i>}
        </button>
    );
}
