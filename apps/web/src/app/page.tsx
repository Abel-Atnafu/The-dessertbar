import HeroSection from "@/components/sections/HeroSection";
import FeaturedItems from "@/components/sections/FeaturedItems";
import AboutSnippet from "@/components/sections/AboutSnippet";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/Footer";
import { prisma } from "@dessertbar/db";

async function getFeaturedItems() {
  try {
    return await prisma.menuItem.findMany({
      where: { featured: true, available: true },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedItems();

  return (
    <>
      <HeroSection />
      <FeaturedItems items={featured} />
      <AboutSnippet />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  );
}
