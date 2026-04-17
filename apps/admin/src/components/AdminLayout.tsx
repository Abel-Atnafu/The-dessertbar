"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, UtensilsCrossed, ShoppingBag, Calendar,
  Images, LogOut, Menu, X, ChefHat, MessageSquare, CakeSlice
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/cakes", label: "Custom Cakes", icon: CakeSlice },
  { href: "/reservations", label: "Reservations", icon: Calendar },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/messages", label: "Messages", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gray-900 flex flex-col transition-all duration-300 flex-shrink-0",
          sidebarOpen ? "w-60" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-800">
          <div className="w-8 h-8 bg-gold-500 flex items-center justify-center flex-shrink-0">
            <ChefHat size={16} className="text-gray-900" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-white font-semibold text-sm leading-none">
                The Dessert Bar
              </p>
              <p className="text-gray-400 text-xs mt-0.5">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-2 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all group",
                  active
                    ? "bg-gold-500/10 text-gold-400 border-l-2 border-gold-500"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-gray-800 space-y-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-sm text-sm transition-all"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            {sidebarOpen && <span>Collapse</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-sm text-sm transition-all"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
