"use client";

import { useState } from "react";
import { CheckCircle, Calendar, Clock, Users } from "lucide-react";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
];

export default function ReservationsClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: parseInt(form.guests) }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please call us to reserve.");
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
            Reservation Requested!
          </h2>
          <p className="text-chocolate-500 leading-relaxed mb-2">
            Thank you, <strong>{form.name}</strong>. We&apos;ve received your
            reservation request for <strong>{form.guests} guests</strong> on{" "}
            <strong>{form.date}</strong> at <strong>{form.time}</strong>.
          </p>
          <p className="text-chocolate-400 text-sm mb-8">
            We&apos;ll confirm via email or phone shortly.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setForm({
                name: "", email: "", phone: "",
                date: "", time: "", guests: "2", notes: "",
              });
            }}
            className="btn-gold"
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 py-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Info badges */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { icon: Calendar, label: "7 Days a Week" },
            { icon: Clock, label: "9am – 10pm" },
            { icon: Users, label: "Up to 20 Guests" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-white p-5 text-center flex flex-col items-center gap-2"
            >
              <Icon size={22} className="text-gold-500" />
              <span className="text-xs tracking-widest uppercase text-chocolate-600 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-sm"
        >
          <h2 className="font-serif text-2xl text-chocolate-800 mb-8">
            Reservation Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                placeholder="Jane Doe"
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
          </div>

          <div className="mb-5">
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                Time *
              </label>
              <select
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm bg-white"
              >
                <option value="">Select time</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                Guests *
              </label>
              <select
                required
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm bg-white"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-7">
            <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
              Special Requests
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={4}
              className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm resize-none"
              placeholder="Celebrations, dietary requirements, special arrangements..."
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-5">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full disabled:opacity-60"
          >
            {loading ? "Requesting..." : "Request Reservation"}
          </button>

          <p className="text-xs text-chocolate-400 text-center mt-4 tracking-wide">
            We will confirm your reservation within 2 hours by phone or email.
          </p>
        </form>
      </div>
    </div>
  );
}
