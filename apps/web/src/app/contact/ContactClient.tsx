"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-serif text-3xl text-chocolate-800 mb-8">
              Visit Us
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gold-500 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-chocolate-800" />
                </div>
                <div>
                  <p className="font-semibold text-chocolate-800 text-sm tracking-wide mb-1">
                    Address
                  </p>
                  <p className="text-chocolate-500 text-sm leading-relaxed">
                    Bole, Atlas — beside Azzeman Hotel,<br />Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gold-500 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-chocolate-800" />
                </div>
                <div>
                  <p className="font-semibold text-chocolate-800 text-sm tracking-wide mb-1">
                    Phone
                  </p>
                  <a
                    href="https://www.instagram.com/the_dessert_bar_addis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-chocolate-500 text-sm hover:text-gold-600 transition-colors"
                  >
                    @the_dessert_bar_addis
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gold-500 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-chocolate-800" />
                </div>
                <div>
                  <p className="font-semibold text-chocolate-800 text-sm tracking-wide mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:thedessertbaraddis@gmail.com"
                    className="text-chocolate-500 text-sm hover:text-gold-600 transition-colors"
                  >
                    thedessertbaraddis@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gold-500 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-chocolate-800" />
                </div>
                <div>
                  <p className="font-semibold text-chocolate-800 text-sm tracking-wide mb-2">
                    Opening Hours
                  </p>
                  <div className="text-chocolate-500 text-sm space-y-1">
                    <p>Monday – Thursday: 9:00am – 9:00pm</p>
                    <p>Friday – Saturday: 9:00am – 10:00pm</p>
                    <p>Sunday: 10:00am – 8:00pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 bg-cream-200 h-64 flex items-center justify-center border border-cream-300">
              <div className="text-center text-chocolate-400">
                <MapPin size={32} className="mx-auto mb-2 text-gold-500" />
                <p className="text-sm font-medium text-chocolate-600">Bole, Atlas — beside Azzeman Hotel</p>
                <p className="text-xs text-chocolate-400 mt-1">Addis Ababa, Ethiopia</p>
                <a
                  href="https://maps.app.goo.gl/55npJ2CkU4CuLvAB6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-600 text-xs mt-3 block hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-3xl text-chocolate-800 mb-8">
              Send a Message
            </h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
                <CheckCircle size={48} className="text-gold-500" />
                <p className="font-serif text-2xl text-chocolate-800">
                  Message Sent!
                </p>
                <p className="text-chocolate-500 text-sm">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 space-y-5">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                    Your Name *
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
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
