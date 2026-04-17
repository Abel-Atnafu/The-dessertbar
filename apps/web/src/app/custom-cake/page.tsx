import CustomCakeClient from "./CustomCakeClient";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Custom Cake Order — The Dessert Bar",
  description: "Order a bespoke custom cake for birthdays, weddings, graduations and more.",
};

export default function CustomCakePage() {
  return (
    <>
      <div className="bg-chocolate-800 pt-32 pb-16 px-6 text-center">
        <p className="section-label text-gold-400">Bespoke Creations</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream-100">Custom Cakes</h1>
        <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
        <p className="text-cream-200 mt-6 max-w-lg mx-auto text-sm leading-relaxed opacity-80">
          Tell us your vision and we'll bring it to life. Order at least 3 days in advance.
        </p>
      </div>
      <CustomCakeClient />
      <Footer />
    </>
  );
}
