"use client";

import { useState } from "react";
import { formatPrice, formatDate } from "@/lib/utils";

const STATUS_OPTIONS = ["pending", "confirmed", "ready", "completed", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-800",
};

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  menuItem: { name: string };
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  total: number;
  status: string;
  notes?: string | null;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-colors ${
              filter === s
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Items</th>
              <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Total</th>
              <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((order) => (
              <>
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-sm text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-400">{order.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateStatus(order.id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize border-0 focus:outline-none cursor-pointer ${
                        statusColors[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-right text-xs">
                    {expanded === order.id ? "▲" : "▼"}
                  </td>
                </tr>
                {expanded === order.id && (
                  <tr key={`${order.id}-expanded`} className="bg-gray-50">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="text-sm space-y-2">
                        <p className="text-gray-500 text-xs">
                          <strong className="text-gray-700">Email:</strong> {order.email}
                        </p>
                        {order.notes && (
                          <p className="text-gray-500 text-xs">
                            <strong className="text-gray-700">Notes:</strong> {order.notes}
                          </p>
                        )}
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-700 mb-1">Items:</p>
                          <ul className="space-y-1">
                            {order.items.map((item) => (
                              <li key={item.id} className="text-xs text-gray-500 flex justify-between">
                                <span>{item.menuItem.name} × {item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
