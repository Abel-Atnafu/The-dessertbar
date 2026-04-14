import GalleryClient from "./GalleryClient";
import Footer from "@/components/Footer";
import { prisma } from "@dessertbar/db";

async function getGallery() {
  try {
    return await prisma.galleryImage.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Gallery — The Dessert Bar",
  description: "A visual journey through our handcrafted desserts and cafe.",
};

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <>
      <div className="bg-chocolate-800 pt-32 pb-16 px-6 text-center">
        <p className="section-label text-gold-400">Visual Stories</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream-100">
          Gallery
        </h1>
        <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
      </div>
      <GalleryClient images={images} />
      <Footer />
    </>
  );
}
