import ReservationsClient from "./ReservationsClient";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Reservations — The Dessert Bar",
  description: "Book a table at The Dessert Bar for a memorable experience.",
};

export default function ReservationsPage() {
  return (
    <>
      <div className="bg-chocolate-800 pt-32 pb-16 px-6 text-center">
        <p className="section-label text-gold-400">Book Your Visit</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream-100">
          Reservations
        </h1>
        <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
        <p className="text-cream-200 opacity-60 mt-6 text-sm max-w-md mx-auto">
          Reserve your table and let us prepare something extraordinary for you.
        </p>
      </div>
      <ReservationsClient />
      <Footer />
    </>
  );
}
