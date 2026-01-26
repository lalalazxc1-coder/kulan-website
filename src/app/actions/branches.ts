'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// BRANCH (CITY)
export async function createBranch(data: { name_ru: string; name_kk: string; name_en: string; slug: string; sortOrder?: number }) {
    try {
        await prisma.branch.create({ data });
        revalidatePath('/admin/branches');
        revalidatePath('/contacts');
        return { success: true };
    } catch (e) {
        return { success: false, error: String(e) };
    }
}

export async function updateBranch(id: number, data: { name_ru: string; name_kk: string; name_en: string; slug: string; sortOrder?: number }) {
    try {
        await prisma.branch.update({ where: { id }, data });
        revalidatePath('/admin/branches');
        revalidatePath('/contacts');
        return { success: true };
    } catch (e) {
        return { success: false, error: String(e) };
    }
}

export async function deleteBranch(id: number) {
    try {
        await prisma.branch.delete({ where: { id } });
        revalidatePath('/admin/branches');
        revalidatePath('/contacts');
        return { success: true };
    } catch (e) {
        return { success: false, error: String(e) };
    }
}

// LOCATION
export async function createLocation(data: {
    branchId: number;
    name_ru?: string; name_kk?: string; name_en?: string;
    address_ru: string; address_kk: string; address_en: string;
    phones?: string; emails?: string;
    mapLink?: string;
    type: string; sortOrder?: number;
}) {
    try {
        await prisma.branchLocation.create({ data });
        revalidatePath('/admin/branches');
        revalidatePath('/contacts');
        return { success: true };
    } catch (e) {
        return { success: false, error: String(e) };
    }
}

export async function updateLocation(id: number, data: {
    name_ru?: string; name_kk?: string; name_en?: string;
    address_ru: string; address_kk: string; address_en: string;
    phones?: string; emails?: string;
    mapLink?: string;
    type: string; sortOrder?: number;
}) {
    try {
        await prisma.branchLocation.update({ where: { id }, data });
        revalidatePath('/admin/branches');
        revalidatePath('/contacts');
        return { success: true };
    } catch (e) {
        return { success: false, error: String(e) };
    }
}

export async function deleteLocation(id: number) {
    try {
        await prisma.branchLocation.delete({ where: { id } });
        revalidatePath('/admin/branches');
        revalidatePath('/contacts');
        return { success: true };
    } catch (e) {
        return { success: false, error: String(e) };
    }
}
