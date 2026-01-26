'use server';

import { prisma } from '@/lib/prisma';

export async function getFeaturedProducts(limit: number = 4) {
    try {
        // Fetch random or latest products. Ideally we should have a 'isFeatured' flag.
        // For now, let's just get the latest ones.
        // Fetch random IDs first
        const randomIds: { id: number }[] = await prisma.$queryRaw`SELECT id FROM "Product" ORDER BY RANDOM() LIMIT ${limit}`;

        if (randomIds.length === 0) return [];

        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: randomIds.map(r => r.id)
                }
            },
            include: {
                brand: true,
                category: true,
            },
        });

        return products;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
}
