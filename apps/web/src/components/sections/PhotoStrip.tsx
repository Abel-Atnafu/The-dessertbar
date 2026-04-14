import Image from "next/image";
import Link from "next/link";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop",
    alt: "Chocolate Torte",
    label: "Signature Cakes",
  },
  {
    src: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop",
    alt: "Classic Tiramisu",
    label: "Italian Classics",
  },
  {
    src: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop",
    alt: "Freak Shake",
    label: "Freak Shakes",
  },
  {
    src: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop",
    alt: "Afternoon Tea",
    label: "Afternoon Tea",
  },
  {
    src: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop",
    alt: "Brownie & Ice Cream",
    label: "Desserts",
  },
  {
    src: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop",
    alt: "New York Cheesecake",
    label: "Cheesecakes",
  },
];

export default function PhotoStrip() {
  return (
    <section className="bg-chocolate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label text-gold-400">Visual Indulgence</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream-100">
            Crafted to be Admired
          </h2>
          <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo, idx) => (
            <div
              key={photo.alt}
              className={`relative overflow-hidden group cursor-pointer ${
                idx === 0 ? "md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-chocolate-900/30 group-hover:bg-chocolate-900/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-chocolate-900 to-transparent">
                <p className="text-cream-100 text-xs font-semibold tracking-[0.2em] uppercase">
                  {photo.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery" className="btn-outline">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
