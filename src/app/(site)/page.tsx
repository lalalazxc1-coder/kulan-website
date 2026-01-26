import { prisma } from '@/lib/prisma';
import { HomeView } from "@/components/HomeView";
import { getFeaturedProducts } from '@/app/actions/getProducts';

export const dynamic = 'force-dynamic';

async function getStats() {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: { in: ['stat_years', 'stat_clients', 'stat_brands', 'stat_branches', 'stat_employees'] }
    }
  });

  const map: Record<string, string> = {};
  settings.forEach(s => map[s.key] = s.value);

  return {
    stat_years: map['stat_years'] || "29",
    stat_clients: map['stat_clients'] || "10000+",
    stat_brands: map['stat_brands'] || "100+",
    stat_branches: map['stat_branches'] || "14",
    stat_employees: map['stat_employees'] || "550+"
  };
}

export default async function HomePage() {
  const metrics = await getStats();
  const products = await getFeaturedProducts();
  return <HomeView metrics={metrics} products={products} />;
}
