import MenuClient from "./MenuClient";
import Footer from "@/components/Footer";
import { prisma } from "@dessertbar/db";

async function getMenuItems() {
  try {
    return await prisma.menuItem.findMany({
      where: { available: true },
      orderBy: { category: "asc" },
    });
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Menu — The Dessert Bar",
  description: "Explore our full menu of handcrafted cakes, pastries, and artisan drinks.",
};

export default async function MenuPage() {
  const items = await getMenuItems();
  const categories = Array.from(new Set(items.map((i: { category: string }) => i.category)));

  return (
    <>
      {/* Page Header */}
      <div className="bg-chocolate-800 pt-32 pb-16 px-6 text-center">
        <p className="section-label text-gold-400">Handcrafted Daily</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream-100">
          Our Menu
        </h1>
        <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
      </div>

      <MenuClient items={items} categories={categories} />
      <Footer />
    </>
  );
}
