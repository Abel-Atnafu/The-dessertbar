import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@dessertbar/db";
import { ShoppingBag, Calendar, DollarSign, UtensilsCrossed } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

async function getStats() {
  const today = new Date().toISOString().split("T")[0];
  const [
    totalOrders,
    pendingOrders,
    pendingReservations,
    menuItemCount,
    recentOrders,
    revenue,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.reservation.count({ where: { status: "pending" } }),
    prisma.menuItem.count({ where: { available: true } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: { include: { menuItem: true } } },
    }),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  return {
    totalOrders,
    pendingOrders,
    pendingReservations,
    menuItemCount,
    recentOrders,
    revenue: revenue._sum.total || 0,
  };
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-800",
};

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back. Here&apos;s what&apos;s happening at The Dessert Bar.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Revenue",
              value: formatPrice(stats.revenue),
              icon: DollarSign,
              color: "text-yellow-600",
              bg: "bg-yellow-50",
            },
            {
              label: "Total Orders",
              value: stats.totalOrders.toString(),
              sub: `${stats.pendingOrders} pending`,
              icon: ShoppingBag,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Reservations",
              value: stats.pendingReservations.toString(),
              sub: "awaiting confirmation",
              icon: Calendar,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              label: "Menu Items",
              value: stats.menuItemCount.toString(),
              sub: "currently available",
              icon: UtensilsCrossed,
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={`w-8 h-8 ${stat.bg} flex items-center justify-center rounded`}>
                  <stat.icon size={16} className={stat.color} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.sub && (
                <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
              )}
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Recent Orders</h2>
            <a href="/orders" className="text-yellow-600 text-sm hover:underline">
              View all →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Items
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Total
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-sm text-gray-900">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-400">{order.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                          statusColors[order.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {formatDate(order.createdAt.toISOString())}
                    </td>
                  </tr>
                ))}
                {stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
