import Link from "next/link";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-chocolate-900 text-cream-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl text-gold-500 mb-3">
              The Dessert Bar
            </h3>
            <p className="text-xs tracking-[0.3em] uppercase text-cream-300 opacity-60 mb-6">
              Fine Patisserie
            </p>
            <p className="text-sm text-cream-300 opacity-70 leading-relaxed">
              Where every dessert tells a story of passion, craft, and the finest ingredients.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/menu", label: "Our Menu" },
                { href: "/order", label: "Order Online" },
                { href: "/reservations", label: "Reservations" },
                { href: "/gallery", label: "Gallery" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-200 opacity-70 hover:opacity-100 hover:text-gold-400 transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-6">
              Hours
            </h4>
            <ul className="space-y-3 text-sm text-cream-200 opacity-70">
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-gold-500 flex-shrink-0" />
                <span>Mon – Thu: 9am – 9pm</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-gold-500 flex-shrink-0" />
                <span>Fri – Sat: 9am – 10pm</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-gold-500 flex-shrink-0" />
                <span>Sunday: 10am – 8pm</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-6">
              Find Us
            </h4>
            <ul className="space-y-4 text-sm text-cream-200 opacity-70">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Bole, Atlas — beside Azzeman Hotel,<br />Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold-500 flex-shrink-0" />
                <a href="https://www.instagram.com/the_dessert_bar_addis" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  @the_dessert_bar_addis
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-cream-200 opacity-60 hover:opacity-100 hover:text-gold-500 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-cream-200 opacity-60 hover:opacity-100 hover:text-gold-500 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-chocolate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream-200 opacity-40 tracking-widest">
            © {new Date().getFullYear()} The Dessert Bar. All rights reserved.
          </p>
          <p className="text-xs text-cream-200 opacity-40 tracking-widest">
            Crafted with passion & butter.
          </p>
        </div>
      </div>
    </footer>
  );
}
