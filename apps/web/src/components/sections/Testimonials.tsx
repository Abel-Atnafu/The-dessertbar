import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amelia Chen",
    role: "Food Blogger",
    quote:
      "The Dessert Bar is an absolute gem. The Velvet Dream Cake left me speechless — layers of perfection that melt in your mouth. I've never experienced anything quite like it.",
    rating: 5,
    avatar: "AC",
  },
  {
    name: "James Okafor",
    role: "Regular Guest",
    quote:
      "I've been coming here every week for two years. The quality never wavers, the service is impeccable, and the hot chocolate is simply the best in the city.",
    rating: 5,
    avatar: "JO",
  },
  {
    name: "Sarah Mitchell",
    role: "Event Planner",
    quote:
      "We used The Dessert Bar for our corporate event. The Afternoon Tea Set was a showstopper. Every guest was raving about it — absolutely world-class presentation.",
    rating: 5,
    avatar: "SM",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">Guest Experiences</p>
          <h2 className="font-serif text-4xl md:text-5xl text-chocolate-800">
            What Our Guests Say
          </h2>
          <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-8 relative group hover:shadow-xl transition-shadow duration-500"
            >
              {/* Gold accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-gold-500 text-gold-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-chocolate-600 leading-relaxed text-sm italic mb-8 opacity-80">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-chocolate-800 flex items-center justify-center text-gold-500 font-semibold text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-chocolate-800 text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-chocolate-400 tracking-wide">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
