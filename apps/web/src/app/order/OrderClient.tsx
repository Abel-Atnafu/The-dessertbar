"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface FormData {
  customerName: string;
  email: string;
  phone: string;
  notes: string;
}

export default function OrderClient() {
  const { state, dispatch, total, itemCount } = useCart();
  const [form, setForm] = useState<FormData>({
    customerName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: state.items.map((i) => ({
            menuItemId: i.id,
            quantity: i.quantity,
            price: i.price,
          })),
          total,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");
      dispatch({ type: "CLEAR_CART" });
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="text-gold-500 mx-auto mb-6" />
          <h2 className="font-serif text-4xl text-chocolate-800 mb-4">
            Order Placed!
          </h2>
          <p className="text-chocolate-500 leading-relaxed mb-8">
            Thank you for your order. We&apos;ll call you shortly to confirm and
            let you know when it&apos;s ready.
          </p>
          <Link href="/menu" className="btn-gold">
            Order Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {state.items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={64} className="text-cream-300 mx-auto mb-6" />
            <h2 className="font-serif text-3xl text-chocolate-600 mb-4">
              Your cart is empty
            </h2>
            <p className="text-chocolate-400 mb-8">
              Head to our menu and add some treats.
            </p>
            <Link href="/menu" className="btn-gold">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Cart */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl text-chocolate-800 mb-6">
                Order Summary ({itemCount} items)
              </h2>
              <div className="bg-white divide-y divide-cream-200">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-5">
                    {item.image && (
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-chocolate-800 font-semibold truncate">
                        {item.name}
                      </h3>
                      <p className="text-gold-600 font-semibold text-sm">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: { id: item.id, quantity: item.quantity - 1 },
                            })
                          }
                          className="w-7 h-7 border border-cream-200 flex items-center justify-center hover:border-gold-500"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: { id: item.id, quantity: item.quantity + 1 },
                            })
                          }
                          className="w-7 h-7 border border-cream-200 flex items-center justify-center hover:border-gold-500"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() =>
                            dispatch({ type: "REMOVE_ITEM", payload: item.id })
                          }
                          className="ml-auto text-cream-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <span className="font-semibold text-chocolate-700 text-sm whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-chocolate-800 p-5 flex justify-between items-center">
                <span className="text-cream-200 tracking-wider uppercase text-sm">
                  Total
                </span>
                <span className="font-serif text-2xl text-gold-500">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-chocolate-800 mb-6">
                Your Details
              </h2>
              <form onSubmit={handleSubmit} className="bg-white p-6 space-y-5">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.customerName}
                    onChange={(e) =>
                      setForm({ ...form, customerName: e.target.value })
                    }
                    className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                    placeholder="+1 555 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                    Special Notes
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm resize-none"
                    placeholder="Allergies, special requests..."
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
