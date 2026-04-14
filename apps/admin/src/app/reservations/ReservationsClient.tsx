"use client";

import { useState } from "react";
import { Users, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string | null;
  status: string;
  createdAt: string;
}

export default function ReservationsClient({
  initialReservations,
}: {
  initialReservations: Reservation[];
}) {
  const [reservations, setReservations] = useState(initialReservations);
  const [filter, setFilter] = useState("all");

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const filtered =
    filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((res) => (
          <div key={res.id} className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{res.name}</h3>
                <p className="text-xs text-gray-400">{res.email}</p>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                  statusColors[res.status] || "bg-gray-100"
                }`}
              >
                {res.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={14} className="text-yellow-500 flex-shrink-0" />
                <span>{res.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={14} className="text-yellow-500 flex-shrink-0" />
                <span>{res.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={14} className="text-yellow-500 flex-shrink-0" />
                <span>{res.guests} guest{res.guests !== 1 ? "s" : ""}</span>
              </div>
            </div>

            {res.notes && (
              <p className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded mb-4 italic">
                &ldquo;{res.notes}&rdquo;
              </p>
            )}

            <div className="flex gap-2">
              {STATUS_OPTIONS.filter((s) => s !== res.status).map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(res.id, s)}
                  className={`flex-1 text-xs py-1.5 font-medium rounded capitalize transition-colors ${
                    s === "confirmed"
                      ? "bg-green-50 text-green-700 hover:bg-green-100"
                      : s === "cancelled"
                      ? "bg-red-50 text-red-700 hover:bg-red-100"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-300 mt-3">{formatDate(res.createdAt)}</p>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <Calendar size={40} className="mx-auto mb-3 opacity-30" />
            <p>No reservations found</p>
          </div>
        )}
      </div>
    </div>
  );
}
