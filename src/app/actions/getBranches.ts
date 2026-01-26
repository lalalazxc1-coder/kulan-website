"use server";

import { prisma } from "@/lib/prisma";

export async function getBranchesForMap() {
    try {
        const branches = await prisma.branch.findMany({
            include: {
                locations: {
                    orderBy: {
                        sortOrder: "asc",
                    },
                },
            },
            orderBy: {
                sortOrder: "asc",
            },
        });
        return branches;
    } catch (error) {
        console.error("Error fetching branches for map:", error);
        return [];
    }
}
