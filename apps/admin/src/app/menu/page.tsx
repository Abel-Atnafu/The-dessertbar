export const dynamic = "force-dynamic";

import AdminLayout from "@/components/AdminLayout";
import MenuClient from "./MenuClient";
import { prisma } from "@dessertbar/db";

async function getMenuItems() {
  return prisma.menuItem.findMany({ orderBy: { createdAt: "desc" } });
}

export default async function AdminMenuPage() {
  const items = await getMenuItems();

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            {items.length} items — {items.filter((i) => i.available).length} available
          </p>
        </div>
        <MenuClient initialItems={JSON.parse(JSON.stringify(items))} />
      </div>
    </AdminLayout>
  );
}
