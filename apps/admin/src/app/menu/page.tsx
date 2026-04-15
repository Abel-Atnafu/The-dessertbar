export const dynamic = "force-dynamic";

import AdminLayout from "@/components/AdminLayout";
import MenuClient from "./MenuClient";
import { prisma } from "@dessertbar/db";

async function getMenuItems() {
  return prisma.menuItem.findMany({ orderBy: { createdAt: "desc" } });
}

const DbError = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
    <p className="font-semibold mb-1">Failed to load data</p>
    <p className="text-sm">Could not connect to the database. Please check your DATABASE_URL.</p>
  </div>
);

export default async function AdminMenuPage() {
  let items;
  try {
    items = await getMenuItems();
  } catch (error) {
    console.error("Menu page error:", error);
    return <AdminLayout><div className="p-8"><h1 className="text-2xl font-bold text-gray-900 mb-8">Menu Management</h1><DbError /></div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            {items.length} items — {items.filter((i: { available: boolean }) => i.available).length} available
          </p>
        </div>
        <MenuClient initialItems={JSON.parse(JSON.stringify(items))} />
      </div>
    </AdminLayout>
  );
}
