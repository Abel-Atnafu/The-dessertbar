"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string | null;
  featured: boolean;
}

export default function MenuClient({
  items,
  categories,
}: {
  items: MenuItem[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const { dispatch } = useCart();
  const { t } = useLanguage();

  const allCategories = ["All", ...categories];
  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <section className="bg-cream-100 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-sm tracking-widest uppercase font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-chocolate-800 text-gold-500"
                  : "bg-white text-chocolate-600 hover:bg-cream-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="card-dessert bg-white">
              <div className="relative h-52 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-cream-200 flex items-center justify-center">
                    <span className="text-4xl">🍰</span>
                  </div>
                )}
                {item.featured && (
                  <span className="absolute top-3 left-3 bg-gold-500 text-chocolate-800 text-xs font-bold px-2 py-0.5 tracking-wider uppercase">
                    {t.menu.featured}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-serif text-lg text-chocolate-800 leading-snug">
                    {item.name}
                  </h3>
                  <span className="text-gold-600 font-semibold text-sm whitespace-nowrap">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-xs text-chocolate-500 opacity-75 leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD_ITEM",
                      payload: {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image || undefined,
                      },
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 bg-cream-100 hover:bg-chocolate-800 hover:text-cream-100 text-chocolate-700 text-xs font-semibold tracking-widest uppercase py-2.5 transition-all duration-300"
                >
                  <Plus size={14} />
                  {t.menu.addToOrder}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-chocolate-400">
            <p className="font-serif text-2xl">{t.menu.noItems}</p>
          </div>
        )}
      </div>
    </section>
  );
}
