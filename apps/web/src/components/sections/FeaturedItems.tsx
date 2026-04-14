"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string | null;
}

export default function FeaturedItems({ items }: { items: MenuItem[] }) {
  const { dispatch } = useCart();

  return (
    <section className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">Our Signatures</p>
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate-800">
            Featured Creations
          </h2>
          <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="card-dessert">
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-cream-200">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-cream-300 flex items-center justify-center">
                    <span className="text-chocolate-400 text-4xl">🍰</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-chocolate-900/20 group-hover:bg-chocolate-900/10 transition-colors duration-500" />
                <span className="absolute top-4 left-4 bg-gold-500 text-chocolate-800 text-xs font-semibold px-3 py-1 tracking-widest uppercase">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-serif text-xl text-chocolate-800 leading-snug">
                    {item.name}
                  </h3>
                  <span className="text-gold-600 font-semibold text-lg whitespace-nowrap">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-sm text-chocolate-500 opacity-80 leading-relaxed mb-5 line-clamp-2">
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
                  className="flex items-center gap-2 text-gold-600 text-sm font-semibold tracking-widest uppercase hover:text-gold-500 transition-colors group/btn"
                >
                  <Plus
                    size={16}
                    className="border border-gold-600 group-hover/btn:border-gold-500 group-hover/btn:bg-gold-500 group-hover/btn:text-white rounded-full transition-all"
                  />
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href="/menu" className="btn-gold">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
