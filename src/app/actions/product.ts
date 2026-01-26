'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import type { ServerActionResult } from '@/types';

// Helper to save file
async function saveUpload(file: File): Promise<string> {
    const ALLOWED_MIME_TYPES = new Set([
        'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
        'application/pdf'
    ]);

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
        throw new Error(`Invalid file type: ${file.type}. Allowed: images, PDF.`);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = uniqueSuffix + '-' + safeName;

    const uploadDir = join(process.cwd(), 'public', 'uploads');

    await mkdir(uploadDir, { recursive: true });
    await writeFile(join(uploadDir, filename), buffer);

    return `/uploads/${filename}`;
}

export async function createProduct(formData: FormData): Promise<ServerActionResult | never> {
    const name = formData.get('name') as string;
    const article = formData.get('article') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const applicability = formData.get('applicability') as string;
    const imageFile = formData.get('image') as File;
    const categoryId = formData.get('categoryId') as string;
    const brandId = formData.get('brandId') as string;
    const specs = formData.get('specs') as string || '[]';

    // Meta JSONs
    const documentsMetaStr = formData.get('documents_meta') as string || '[]';
    const galleryMetaStr = formData.get('gallery_meta') as string || '[]';

    if (!name || (!imageFile && !formData.get('image'))) {
        return { success: false, error: 'Название и изображение обязательны' };
    }

    try {
        let imagePath = '';
        if (imageFile && imageFile.size > 0) {
            imagePath = await saveUpload(imageFile);
        }

        let documents = [];
        try {
            const docsMeta = JSON.parse(documentsMetaStr);
            for (const meta of docsMeta) {
                let url = meta.url;
                if (meta.hasNewFile) {
                    const file = formData.get(`doc_file_${meta.id}`) as File;
                    if (file) url = await saveUpload(file);
                }
                if (url || meta.name) documents.push({ name: meta.name, url });
            }
        } catch (e) { console.error('Error parsing documents meta', e); }

        let gallery = [];
        try {
            const galleryMeta = JSON.parse(galleryMetaStr);
            for (const meta of galleryMeta) {
                let url = meta.url;
                if (meta.hasNewFile) {
                    const file = formData.get(`gallery_file_${meta.id}`) as File;
                    if (file) url = await saveUpload(file);
                }
                if (url) gallery.push(url);
            }
        } catch (e) { console.error('Error parsing gallery meta', e); }

        const { getSession } = require('@/lib/auth');
        const session = await getSession();

        let finalSlug = slug || name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '');
        // Check uniqueness
        const existingSlug = await prisma.product.findFirst({
            where: { slug: finalSlug }
        });

        if (existingSlug) {
            finalSlug = `${finalSlug}-${Math.floor(Math.random() * 10000)}`;
        }

        await prisma.product.create({
            data: {
                name,
                article,
                slug: finalSlug,
                description,
                applicability,
                image: imagePath,
                categoryId: categoryId ? parseInt(categoryId) : null,
                brandId: brandId ? parseInt(brandId) : null,
                createdById: session?.user?.id ? parseInt(session.user.id) : null,
                specs: specs,
                documents: JSON.stringify(documents),
                gallery: JSON.stringify(gallery)
            },
        });

    } catch (error) {
        console.error('Create Product Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Ошибка при создании товара';
        return { success: false, error: errorMessage };
    }

    revalidatePath('/admin/products');
    revalidatePath('/catalog');
    redirect('/admin/products');
}

export async function updateProduct(formData: FormData): Promise<ServerActionResult | never> {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const article = formData.get('article') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const applicability = formData.get('applicability') as string;
    const imageFile = formData.get('image') as File;
    const categoryId = formData.get('categoryId') as string;
    const brandId = formData.get('brandId') as string;
    const specs = formData.get('specs') as string || '[]';

    const documentsMetaStr = formData.get('documents_meta') as string || '[]';
    const galleryMetaStr = formData.get('gallery_meta') as string || '[]';

    if (!id || !name) return { success: false, error: 'ID и Название обязательны' };

    try {
        const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
        if (!product) return { success: false, error: 'Товар не найден' };

        let imagePath = product.image;
        if (imageFile && imageFile.size > 0) {
            imagePath = await saveUpload(imageFile);
        }

        let documents = [];
        try {
            const docsMeta = JSON.parse(documentsMetaStr);
            for (const meta of docsMeta) {
                let url = meta.originalUrl;
                if (meta.hasNewFile) {
                    const file = formData.get(`doc_file_${meta.id}`) as File;
                    if (file) url = await saveUpload(file);
                }
                if (url) documents.push({ name: meta.name, url });
            }
        } catch (e) { console.error(e); }

        let gallery = [];
        try {
            const galleryMeta = JSON.parse(galleryMetaStr);
            for (const meta of galleryMeta) {
                let url = meta.originalUrl;
                if (meta.hasNewFile) {
                    const file = formData.get(`gallery_file_${meta.id}`) as File;
                    if (file) url = await saveUpload(file);
                }
                if (url) gallery.push(url);
            }
        } catch (e) { console.error(e); }


        await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                article,
                slug: slug || undefined,
                description,
                applicability,
                image: imagePath,
                category: categoryId ? { connect: { id: parseInt(categoryId) } } : { disconnect: true },
                brand: brandId ? { connect: { id: parseInt(brandId) } } : { disconnect: true },
                specs,
                documents: JSON.stringify(documents),
                gallery: JSON.stringify(gallery)
            }
        });

    } catch (error) {
        console.error('Update Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Ошибка при обновлении товара';
        return { success: false, error: errorMessage };
    }

    revalidatePath('/admin/products');
    revalidatePath('/catalog');
    redirect('/admin/products');
}

export async function deleteProduct(id: number): Promise<ServerActionResult> {
    try {
        await prisma.product.delete({ where: { id } });
        revalidatePath('/admin/products');
        revalidatePath('/catalog');
        return { success: true, data: undefined };
    } catch (error) {
        console.error('Delete Product Error:', error);
        return { success: false, error: 'Ошибка удаления товара' };
    }
}
