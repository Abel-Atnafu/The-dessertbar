import ContactClient from "./ContactClient";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — The Dessert Bar",
  description: "Find us, reach out, or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-chocolate-800 pt-32 pb-16 px-6 text-center">
        <p className="section-label text-gold-400">Get in Touch</p>
        <h1 className="font-serif text-5xl md:text-6xl text-cream-100">
          Contact Us
        </h1>
        <div className="w-16 h-px bg-gold-500 mx-auto mt-6" />
      </div>
      <ContactClient />
      <Footer />
    </>
  );
}
