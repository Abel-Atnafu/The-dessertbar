import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — The Dessert Bar",
  description: "Our story, our values, and the people behind The Dessert Bar.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-chocolate-800 pt-32 pb-16 px-6 text-center">
        <p className="section-label text-gold-400">Who We Are</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream-100">
          Our Story
        </h1>
        <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
      </div>

      {/* Story Section */}
      <section className="bg-cream-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop"
                alt="Our pastry chef at work"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="section-label">Founded in 2018</p>
              <h2 className="font-serif text-4xl text-chocolate-800 mb-6">
                A Love Letter to Fine Pastry
              </h2>
              <div className="space-y-4 text-chocolate-600 leading-relaxed opacity-80">
                <p>
                  The Dessert Bar was born from a single, stubborn belief: that
                  the best desserts in the world shouldn&apos;t be reserved for
                  Michelin-starred restaurants. They should be accessible,
                  intimate, and personal.
                </p>
                <p>
                  Our founder, trained in Paris and Lyon, returned home with a
                  dream to open a patisserie that felt like a warm hug — where
                  the smell of fresh croissants greets you at the door, where
                  every table feels like a private dining room, and where the
                  desserts are worth writing home about.
                </p>
                <p>
                  Eight years later, we&apos;ve grown from a three-table cafe into
                  a beloved neighbourhood institution — but our philosophy
                  hasn&apos;t changed: every dessert we serve is handcrafted with
                  the same passion, precision, and love as the very first one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-chocolate-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label text-gold-400">What Drives Us</p>
            <h2 className="font-serif text-4xl text-cream-100">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Craftsmanship",
                desc: "Every item is made by hand, from scratch, every single day. No shortcuts, no compromises.",
                icon: "✦",
              },
              {
                title: "Finest Ingredients",
                desc: "Belgian Callebaut chocolate. Madagascan vanilla. Local seasonal fruit. The ingredient always comes first.",
                icon: "✦",
              },
              {
                title: "Warmth & Welcome",
                desc: "You are a guest in our home. From the moment you walk in, every detail is designed to make you feel special.",
                icon: "✦",
              },
            ].map((v) => (
              <div key={v.title} className="text-center p-8">
                <span className="text-gold-500 text-2xl block mb-4">{v.icon}</span>
                <h3 className="font-serif text-2xl text-cream-100 mb-4">{v.title}</h3>
                <p className="text-cream-200 opacity-70 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream-200 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "8+", label: "Years Open" },
              { num: "22+", label: "Menu Items" },
              { num: "10k+", label: "Happy Guests" },
              { num: "4.9★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label}>
                <span className="font-serif text-4xl text-gold-600 block">{s.num}</span>
                <span className="text-xs text-chocolate-500 tracking-widest uppercase mt-1 block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-100 py-20 text-center">
        <p className="section-label">Come Say Hello</p>
        <h2 className="font-serif text-4xl text-chocolate-800 mb-6">
          We&apos;d Love to Meet You
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservations" className="btn-gold">
            Reserve a Table
          </Link>
          <Link href="/contact" className="btn-outline">
            Find Us
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
