export const dynamic = "force-dynamic";

import { prisma } from "@dessertbar/db";
import AdminLayout from "@/components/AdminLayout";
import CakesClient from "./CakesClient";

async function getCakeOrders() {
  try {
    return await prisma.customCakeOrder.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function CakesPage() {
  const cakes = await getCakeOrders();
  const serialized = cakes.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    budget: c.budget ?? null,
  }));

  return (
    <AdminLayout>
      <CakesClient initialCakes={serialized} />
    </AdminLayout>
  );
}
