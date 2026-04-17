"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const OCCASIONS = ["Birthday", "Wedding", "Anniversary", "Graduation", "Corporate", "Baby Shower", "Other"];
const SIZES = [
  { value: "Small (6-inch, serves 8)",       label: "Small — 6 inch · serves 8" },
  { value: "Medium (8-inch, serves 16)",      label: "Medium — 8 inch · serves 16" },
  { value: "Large (10-inch, serves 24)",      label: "Large — 10 inch · serves 24" },
  { value: "Extra Large (12-inch, serves 36)",label: "Extra Large — 12 inch · serves 36" },
];
const FLAVORS    = ["Vanilla", "Chocolate", "Red Velvet", "Lemon", "Carrot", "Marble", "Strawberry"];
const FROSTINGS  = ["Buttercream", "Whipped Cream", "Fondant", "Cream Cheese", "Ganache"];
const TIMES      = ["Morning (9 am – 12 pm)", "Afternoon (12 pm – 5 pm)"];

export default function CustomCakeClient() {
  const { t } = useLanguage();
  const c = t.cake;

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    occasion: "", cakeSize: "", layers: "1",
    flavor: "", frosting: "", design: "",
    colors: "", pickupDate: "", pickupTime: "",
    budget: "", notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/custom-cake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, layers: Number(form.layers), budget: form.budget ? Number(form.budget) : null }),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] bg-cream-100 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="text-gold-500 mx-auto mb-6" />
          <h2 className="font-serif text-4xl text-chocolate-800 mb-4">{c.success}</h2>
          <p className="text-chocolate-500 leading-relaxed mb-8">{c.successMsg}</p>
          <Link href="/menu" className="btn-gold">{c.backToMenu}</Link>
        </div>
      </div>
    );
  }

  const inputCls = "w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm bg-white";
  const selectCls = inputCls;
  const labelCls = "block text-xs tracking-widest uppercase text-chocolate-500 mb-2";

  return (
    <section className="bg-cream-100 py-16">
      <div className="max-w-2xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>{c.name} *</label>
              <input required type="text" value={form.name} onChange={set("name")} className={inputCls} placeholder="Selam Tadesse" />
            </div>
            <div>
              <label className={labelCls}>{c.phone} *</label>
              <input required type="tel" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+251 91 234 5678" />
            </div>
          </div>

          <div>
            <label className={labelCls}>{c.email} *</label>
            <input required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="selam@example.com" />
          </div>

          <div>
            <label className={labelCls}>{c.occasion} *</label>
            <select required value={form.occasion} onChange={set("occasion")} className={selectCls}>
              <option value="">Select occasion...</option>
              {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>{c.size} *</label>
              <select required value={form.cakeSize} onChange={set("cakeSize")} className={selectCls}>
                <option value="">Select size...</option>
                {SIZES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{c.layers} *</label>
              <select required value={form.layers} onChange={set("layers")} className={selectCls}>
                {[1, 2, 3].map(n => <option key={n} value={n}>{n} layer{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>{c.flavor} *</label>
              <select required value={form.flavor} onChange={set("flavor")} className={selectCls}>
                <option value="">Select flavor...</option>
                {FLAVORS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{c.frosting} *</label>
              <select required value={form.frosting} onChange={set("frosting")} className={selectCls}>
                <option value="">Select frosting...</option>
                {FROSTINGS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>{c.design} *</label>
            <textarea required value={form.design} onChange={set("design")} rows={3} className={inputCls + " resize-none"} placeholder={c.designPlaceholder} />
          </div>

          <div>
            <label className={labelCls}>{c.colors}</label>
            <input type="text" value={form.colors} onChange={set("colors")} className={inputCls} placeholder={c.colorsPlaceholder} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>{c.pickupDate} *</label>
              <input required type="date" value={form.pickupDate} onChange={set("pickupDate")}
                min={new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0]}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{c.pickupTime} *</label>
              <select required value={form.pickupTime} onChange={set("pickupTime")} className={selectCls}>
                <option value="">Select time...</option>
                {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>{c.budget}</label>
            <input type="number" min="0" value={form.budget} onChange={set("budget")} className={inputCls} placeholder={c.budgetPlaceholder} />
          </div>

          <div>
            <label className={labelCls}>{c.notes}</label>
            <textarea value={form.notes} onChange={set("notes")} rows={2} className={inputCls + " resize-none"} placeholder={c.notesPlaceholder} />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? c.submitting : c.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
