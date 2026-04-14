import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "The Dessert Bar — Fine Patisserie & Cafe",
  description:
    "Experience the art of fine desserts. Handcrafted cakes, pastries, and bespoke drinks in an intimate, luxurious setting.",
  keywords: "dessert bar, patisserie, cafe, cakes, pastries, fine dining",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <CartDrawer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
