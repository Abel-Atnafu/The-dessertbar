"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

type CakeStatus = "pending" | "reviewing" | "confirmed" | "completed" | "cancelled";

interface CakeOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  cakeSize: string;
  layers: number;
  flavor: string;
  frosting: string;
  design: string;
  colors: string | null;
  pickupDate: string;
  pickupTime: string;
  budget: number | null;
  notes: string | null;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-800",
  reviewing: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-800",
};

const STATUSES: CakeStatus[] = ["pending", "reviewing", "confirmed", "completed", "cancelled"];

export default function CakesClient({ initialCakes }: { initialCakes: CakeOrder[] }) {
  const [cakes, setCakes] = useState(initialCakes);
  const [expanded, setExpanded] = useState<string | null>(null);

  const updateStatus = async (id: string, status: CakeStatus) => {
    const prev = cakes.find(c => c.id === id)?.status;
    setCakes(cs => cs.map(c => c.id === id ? { ...c, status } : c));
    const res = await fetch(`/api/cakes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) setCakes(cs => cs.map(c => c.id === id ? { ...c, status: prev! } : c));
  };

  const deleteCake = async (id: string) => {
    setCakes(cs => cs.filter(c => c.id !== id));
    await fetch(`/api/cakes/${id}`, { method: "DELETE" });
  };

  const pending = cakes.filter(c => c.status === "pending").length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Cake Orders</h1>
          <p className="text-sm text-gray-500 mt-1">{cakes.length} total · {pending} pending</p>
        </div>
      </div>

      {cakes.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded p-12 text-center text-gray-400">
          No custom cake orders yet.
        </div>
      ) : (
        <div className="space-y-3">
          {cakes.map((cake) => (
            <div key={cake.id} className="bg-white border border-gray-200 rounded overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-semibold text-gray-900">{cake.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[cake.status] || "bg-gray-100 text-gray-600"}`}>
                      {cake.status}
                    </span>
                    <span className="text-xs text-gray-400">{cake.occasion}</span>
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500 flex-wrap">
                    <span>{cake.cakeSize}</span>
                    <span>{cake.flavor} · {cake.frosting}</span>
                    <span>Pickup: {cake.pickupDate} {cake.pickupTime}</span>
                    {cake.budget && <span>Budget: ETB {cake.budget}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <select
                    value={cake.status}
                    onChange={e => updateStatus(cake.id, e.target.value as CakeStatus)}
                    className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-yellow-400"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button
                    onClick={() => setExpanded(expanded === cake.id ? null : cake.id)}
                    className="text-gray-400 hover:text-gray-700 p-1"
                  >
                    {expanded === cake.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button onClick={() => deleteCake(cake.id)} className="text-gray-300 hover:text-red-500 p-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {expanded === cake.id && (
                <div className="border-t border-gray-100 px-4 py-4 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p><span className="text-gray-400">Email:</span> <a href={`mailto:${cake.email}`} className="text-blue-600 hover:underline">{cake.email}</a></p>
                    <p><span className="text-gray-400">Phone:</span> {cake.phone}</p>
                    <p><span className="text-gray-400">Layers:</span> {cake.layers}</p>
                    {cake.colors && <p><span className="text-gray-400">Colors:</span> {cake.colors}</p>}
                    <p><span className="text-gray-400">Submitted:</span> {formatDate(cake.createdAt)}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Design</p>
                    <p className="text-gray-700 leading-relaxed">{cake.design}</p>
                    {cake.notes && (
                      <>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mt-3">Notes</p>
                        <p className="text-gray-700 leading-relaxed">{cake.notes}</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
