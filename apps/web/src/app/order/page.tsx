import OrderClient from "./OrderClient";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Order Online — The Dessert Bar",
  description: "Place your order online for pickup or delivery.",
};

export default function OrderPage() {
  return (
    <>
      <div className="bg-chocolate-800 pt-32 pb-16 px-6 text-center">
        <p className="section-label text-gold-400">Order Online</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream-100">
          Your Order
        </h1>
        <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
      </div>
      <OrderClient />
      <Footer />
    </>
  );
}
