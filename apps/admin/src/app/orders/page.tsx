export const dynamic = "force-dynamic";

import AdminLayout from "@/components/AdminLayout";
import OrdersClient from "./OrdersClient";
import { prisma } from "@dessertbar/db";

async function getOrders() {
  return prisma.order.findMany({
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: "desc" },
  });
}

const DbError = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
    <p className="font-semibold mb-1">Failed to load data</p>
    <p className="text-sm">Could not connect to the database. Please check your DATABASE_URL.</p>
  </div>
);

export default async function OrdersPage() {
  let orders;
  try {
    orders = await getOrders();
  } catch (error) {
    console.error("Orders page error:", error);
    return <AdminLayout><div className="p-8"><h1 className="text-2xl font-bold text-gray-900 mb-8">Orders</h1><DbError /></div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            {orders.length} total order{orders.length !== 1 ? "s" : ""}
          </p>
        </div>
        <OrdersClient initialOrders={JSON.parse(JSON.stringify(orders))} />
      </div>
    </AdminLayout>
  );
}
