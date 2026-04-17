export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@dessertbar/db";
import Footer from "@/components/Footer";
import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";

const STATUS_STEPS = [
  { key: "pending",   label: "Order Received",  amLabel: "ትዕዛዝ ተቀብሏል",   icon: Clock },
  { key: "confirmed", label: "Confirmed",        amLabel: "ተረጋግጧል",        icon: CheckCircle },
  { key: "ready",     label: "Ready for Pickup", amLabel: "ለቀብ ዝግጁ ነው",  icon: Package },
  { key: "completed", label: "Completed",        amLabel: "ተጠናቋል",         icon: Truck },
];

function formatPrice(n: number) {
  return `ETB ${n.toLocaleString("en-ET", { minimumFractionDigits: 0 })}`;
}

export default async function TrackPage({ params }: { params: { orderId: string } }) {
  let order = null;
  try {
    order = await prisma.order.findUnique({
      where: { id: params.orderId },
      include: { items: { include: { menuItem: true } } },
    });
  } catch {
    // DB unreachable — show error below
  }

  return (
    <>
      <div className="min-h-screen bg-cream-100 py-24 px-6">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="section-label text-gold-400 mb-2">Order Status</p>
            <h1 className="font-serif text-4xl text-chocolate-800">Track Your Order</h1>
          </div>

          {!order ? (
            <div className="bg-white p-8 text-center">
              <XCircle size={48} className="text-red-400 mx-auto mb-4" />
              <p className="font-serif text-xl text-chocolate-700 mb-2">Order not found</p>
              <p className="text-sm text-chocolate-400 mb-6">
                Order ID: <span className="font-mono">{params.orderId}</span>
              </p>
              <Link href="/order" className="btn-gold">Place an Order</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Status timeline */}
              {order.status !== "cancelled" ? (
                <div className="bg-white p-6">
                  <div className="flex items-start justify-between gap-2">
                    {STATUS_STEPS.map((step, i) => {
                      const stepIndex = STATUS_STEPS.findIndex(s => s.key === order!.status);
                      const done = i <= stepIndex;
                      const Icon = step.icon;
                      return (
                        <div key={step.key} className="flex-1 flex flex-col items-center gap-2 text-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${done ? "bg-gold-500" : "bg-cream-200"}`}>
                            <Icon size={18} className={done ? "text-white" : "text-chocolate-300"} />
                          </div>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`absolute hidden`} />
                          )}
                          <p className={`text-xs font-semibold leading-tight ${done ? "text-chocolate-800" : "text-chocolate-300"}`}>
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4 h-1 bg-cream-200 rounded">
                    <div
                      className="h-1 bg-gold-500 rounded transition-all"
                      style={{ width: `${Math.max(5, ((STATUS_STEPS.findIndex(s => s.key === order.status) + 1) / STATUS_STEPS.length) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 flex items-center gap-4">
                  <XCircle size={32} className="text-red-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-chocolate-800">Order Cancelled</p>
                    <p className="text-sm text-chocolate-400">Please call us if you have any questions.</p>
                  </div>
                </div>
              )}

              {/* Order details */}
              <div className="bg-white p-6">
                <p className="text-xs tracking-widest uppercase text-chocolate-400 mb-4">
                  Order #{order.id.slice(-6).toUpperCase()}
                </p>
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-chocolate-700">
                        {item.menuItem.name}
                        <span className="text-chocolate-400 ml-1">× {item.quantity}</span>
                      </span>
                      <span className="text-chocolate-700 font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-cream-200 pt-4 flex justify-between font-semibold">
                  <span className="text-chocolate-800">Total</span>
                  <span className="text-gold-600">{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Customer info */}
              <div className="bg-white p-6 text-sm text-chocolate-600 space-y-1">
                <p><span className="text-chocolate-400">Name:</span> {order.customerName}</p>
                <p><span className="text-chocolate-400">Phone:</span> {order.phone}</p>
                <p><span className="text-chocolate-400">Payment:</span> {order.paymentMethod || "Cash on Pickup"}</p>
              </div>

              <div className="text-center">
                <Link href="/menu" className="btn-gold">Order Again</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
