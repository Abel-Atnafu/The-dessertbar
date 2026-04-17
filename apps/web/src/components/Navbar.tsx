"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, dispatch } = useCart();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { href: "/menu", label: t.nav.menu },
    { href: "/custom-cake", label: t.nav.customCake },
    { href: "/reservations", label: t.nav.reserve },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-chocolate-800 shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-serif text-xl text-gold-500 tracking-wider group-hover:text-gold-300 transition-colors">
            The Dessert Bar
          </span>
          <span className="text-xs text-cream-200 tracking-[0.3em] uppercase opacity-70">
            Fine Patisserie
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-cream-200 text-sm tracking-widest uppercase hover:text-gold-500 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Lang + Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "am" : "en")}
            className="text-cream-200 hover:text-gold-500 transition-colors text-xs font-semibold tracking-widest uppercase border border-cream-200/30 hover:border-gold-500/50 px-2 py-1 rounded-sm"
            aria-label="Toggle language"
          >
            {lang === "en" ? "አማ" : "EN"}
          </button>
          <button
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            className="relative text-cream-200 hover:text-gold-500 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-chocolate-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden text-cream-200 hover:text-gold-500 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-chocolate-800 border-t border-chocolate-600 px-6 py-6">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-cream-200 text-sm tracking-widest uppercase hover:text-gold-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order"
              onClick={() => setMobileOpen(false)}
              className="btn-gold text-center mt-2"
            >
              {t.nav.orderNow}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
