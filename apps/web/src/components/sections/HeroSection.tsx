"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-chocolate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&auto=format&fit=crop&q=80"
          alt="The Dessert Bar — Addis Ababa"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate-900/60 via-chocolate-900/40 to-chocolate-900/80" />
      </div>

      {/* Decorative lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-24 bg-gold-500 opacity-40" />
        <span className="text-gold-500 text-xs tracking-[0.4em] uppercase rotate-90 whitespace-nowrap opacity-60">
          Est. 2018
        </span>
        <div className="w-px h-24 bg-gold-500 opacity-40" />
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="section-label text-gold-400 mb-6">
          Fine Patisserie & Cafe
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-100 leading-none mb-6">
          Where Desserts
          <br />
          <span className="text-gold-500 italic">Become Art</span>
        </h1>

        <p className="text-cream-200 text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed mb-12">
          Handcrafted with passion and the finest ingredients — every creation
          is a celebration of flavour, texture, and beauty.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu" className="btn-gold">
            Explore the Menu
          </Link>
          <Link href="/reservations" className="btn-outline">
            Reserve a Table
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-cream-200 text-xs tracking-widest uppercase opacity-50">
          Scroll
        </span>
        <ChevronDown size={16} className="text-gold-500 opacity-70" />
      </div>
    </section>
  );
}
