import Link from "next/link";
import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&auto=format&fit=crop&q=80"
          alt="Dessert platter"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-chocolate-900/80" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="section-label text-gold-400 mb-4">
          Special Occasion?
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-cream-100 leading-tight mb-6">
          Reserve Your
          <br />
          <span className="text-gold-500 italic">Sweetest Moment</span>
        </h2>
        <p className="text-cream-200 opacity-70 text-lg mb-10 leading-relaxed">
          Celebrate birthdays, anniversaries, or simply a Tuesday — our team
          will craft an unforgettable experience just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservations" className="btn-gold">
            Book a Table
          </Link>
          <Link href="/order" className="btn-outline">
            Order Online
          </Link>
        </div>
      </div>
    </section>
  );
}
