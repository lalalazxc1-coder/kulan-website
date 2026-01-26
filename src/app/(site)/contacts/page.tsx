import { prisma } from '@/lib/prisma';
import { ContactsView } from '@/components/ContactsView';

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
    const branches = await prisma.branch.findMany({
        include: { locations: { orderBy: { sortOrder: 'asc' } } },
        orderBy: { sortOrder: 'asc' }
    });

    return <ContactsView branches={branches} />;
}
