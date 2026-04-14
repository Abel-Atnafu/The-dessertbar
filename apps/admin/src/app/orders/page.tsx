import AdminLayout from "@/components/AdminLayout";
import OrdersClient from "./OrdersClient";
import { prisma } from "@dessertbar/db";

async function getOrders() {
  return prisma.order.findMany({
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export default async function OrdersPage() {
  const orders = await getOrders();

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
