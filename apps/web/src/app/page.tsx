export const dynamic = "force-dynamic";

import HeroSection from "@/components/sections/HeroSection";
import PhotoStrip from "@/components/sections/PhotoStrip";
import FeaturedItems from "@/components/sections/FeaturedItems";
import AboutSnippet from "@/components/sections/AboutSnippet";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/Footer";
import { prisma } from "@dessertbar/db";

const FALLBACK_FEATURED = [
  {
    id: "m03",
    name: "Chocolate Cake Slice",
    description: "Dense, moist layers of cocoa sponge with velvety chocolate buttercream.",
    price: 373,
    category: "Slices",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop",
  },
  {
    id: "m07",
    name: "Tiramisu",
    description: "Espresso-soaked ladyfingers, mascarpone cream, and a dusting of premium cocoa.",
    price: 355,
    category: "Slices",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop",
  },
  {
    id: "m09",
    name: "Brownie with Ice Cream",
    description: "Warm, gooey brownie with a generous scoop of vanilla ice cream and hot chocolate sauce.",
    price: 537,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop",
  },
  {
    id: "m11",
    name: "Freak Shake",
    description: "A towering thick shake loaded with chocolate cake, whipped cream, and chocolate drizzle.",
    price: 729,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop",
  },
  {
    id: "m18",
    name: "Mango Smoothie",
    description: "Fresh mango blended smooth, served chilled and garnished with a fresh mango slice.",
    price: 237,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop",
  },
  {
    id: "m21",
    name: "Afternoon Tea",
    description: "A curated tiered selection of cakes, pastries, and light bites. Serves two.",
    price: 1998,
    category: "Specials",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop",
  },
];

async function getFeaturedItems() {
  try {
    const items = await prisma.menuItem.findMany({
      where: { featured: true, available: true },
      take: 6,
    });
    return items.length > 0 ? items : FALLBACK_FEATURED;
  } catch {
    return FALLBACK_FEATURED;
  }
}

export default async function HomePage() {
  const featured = await getFeaturedItems();

  return (
    <>
      <HeroSection />
      <PhotoStrip />
      <FeaturedItems items={featured} />
      <AboutSnippet />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  );
}
