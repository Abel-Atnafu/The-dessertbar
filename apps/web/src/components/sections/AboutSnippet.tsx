import Image from "next/image";
import Link from "next/link";

export default function AboutSnippet() {
  return (
    <section className="py-24 bg-chocolate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative h-[500px] hidden lg:block">
            <div className="absolute top-0 left-0 w-3/4 h-3/4 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop"
                alt="Our patisserie"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 overflow-hidden border-4 border-chocolate-700">
              <Image
                src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop"
                alt="Handcrafted desserts"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-chocolate-800 p-6 text-center">
              <span className="font-serif text-4xl font-bold block">8+</span>
              <span className="text-xs tracking-widest uppercase">
                Years of craft
              </span>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-label text-gold-400">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl text-cream-100 leading-tight mb-6">
              Passion Baked
              <br />
              <span className="text-gold-500 italic">Into Every Layer</span>
            </h2>
            <div className="w-12 h-px bg-gold-500 mb-8" />
            <p className="text-cream-200 opacity-70 leading-relaxed mb-6">
              The Dessert Bar was born from a simple belief: that every person
              deserves a moment of pure, unapologetic indulgence. Since 2018,
              our award-winning pastry chefs have been crafting each dessert
              by hand — sourcing only the finest chocolate from Belgium, vanilla
              from Madagascar, and fruit from local farms.
            </p>
            <p className="text-cream-200 opacity-70 leading-relaxed mb-10">
              Step inside our intimate space and let us take you on a journey
              of flavour. Whether it&apos;s a quiet afternoon with a rose latte
              and an almond croissant, or a celebratory slice of our signature
              torte — every visit is a memory in the making.
            </p>
            <Link href="/about" className="btn-outline">
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
