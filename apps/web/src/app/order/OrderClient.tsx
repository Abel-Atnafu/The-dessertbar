"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CheckCircle,
  MapPin,
  Truck,
  ExternalLink,
  Smartphone,
  Upload,
  X,
  Check,
  Banknote,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

// ─── Update these if the delivery app URLs change ──────────────────────────
const DELIVERY_APPS = [
  { name: "Ride", description: "Ride Ethiopia", url: "https://ride8294.com" },
  { name: "Fetan", description: "Fetan Delivery", url: "https://fetan.app" },
];

// Telebirr number customers should send payment to
const TELEBIRR_NUMBER = "+251 90 018 2929";
// ──────────────────────────────────────────────────────────────────────────

type DeliveryOption = "pickup" | "delivery";
type PaymentMethod = "cash" | "telebirr";

interface FormData {
  customerName: string;
  email: string;
  phone: string;
  notes: string;
}

const STEP_LABELS = ["Basket", "Receive", "Details", "Payment"] as const;

export default function OrderClient() {
  const { state, dispatch, total, itemCount } = useCart();

  // ── Wizard state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [stepError, setStepError] = useState("");
  const [deliveryRedirected, setDeliveryRedirected] = useState(false);

  // ── Existing state — keep unchanged
  const [form, setForm] = useState<FormData>({
    customerName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>("pickup");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [telebirrRef, setTelebirrRef] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotBase64, setScreenshotBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successPayment, setSuccessPayment] = useState<PaymentMethod>("cash");
  const [error, setError] = useState("");

  // ── Navigation helper (clears errors, scrolls to top)
  const navigate = (step: 1 | 2 | 3 | 4) => {
    setStepError("");
    setError("");
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Screenshot must be under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setScreenshotBase64(result);
      setScreenshotPreview(result);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const clearScreenshot = () => {
    setScreenshotBase64(null);
    setScreenshotPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.items.length === 0) return;

    if (paymentMethod === "telebirr" && !telebirrRef.trim()) {
      setError("Please enter your Telebirr transaction reference number.");
      return;
    }
    if (paymentMethod === "telebirr" && !screenshotBase64) {
      setError("Please upload a screenshot of your Telebirr payment confirmation.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: state.items.map((i) => ({
            menuItemId: i.id,
            quantity: i.quantity,
            price: i.price,
          })),
          total,
          paymentMethod,
          paymentReference: paymentMethod === "telebirr" ? telebirrRef.trim() : null,
          paymentScreenshot: paymentMethod === "telebirr" ? screenshotBase64 : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");
      dispatch({ type: "CLEAR_CART" });
      setSuccessPayment(paymentMethod);
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center px-6 py-24">
        <div className="w-12 h-px bg-gold-500 mb-8" />
        <CheckCircle size={56} className="text-gold-500 mb-6" />
        <h2 className="font-serif text-4xl sm:text-5xl text-chocolate-800 mb-4">
          Order Placed!
        </h2>
        <p className="text-chocolate-500 max-w-sm text-center mb-6">
          Thank you, {form.customerName}. We&apos;ll call you on {form.phone} to
          confirm when your order is ready.
        </p>
        <div className="bg-white border border-cream-200 mb-10 max-w-sm w-full text-sm p-5">
          {successPayment === "telebirr" ? (
            <p className="text-chocolate-600 leading-relaxed">
              <Smartphone size={16} className="text-green-600 inline mr-2 mb-0.5" />
              Your Telebirr reference has been recorded. We&apos;ll verify it and
              confirm your order by phone.
            </p>
          ) : (
            <p className="text-chocolate-600 leading-relaxed">
              Please have cash ready when you collect from Azzeman Hotel.
            </p>
          )}
        </div>
        <div className="w-12 h-px bg-gold-500 mb-8" />
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/menu" className="btn-gold">Order Again</Link>
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    );
  }

  // ── Delivery-done screen
  if (deliveryRedirected) {
    return (
      <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center px-6 py-24">
        <Truck size={56} className="text-gold-500 mb-6" />
        <h2 className="font-serif text-4xl text-chocolate-800 mb-4">
          You&apos;re all set!
        </h2>
        <p className="text-chocolate-500 max-w-sm text-center mb-6">
          Complete your order in the delivery app. The Dessert Bar — Azzeman Hotel.
        </p>
        <Link href="/menu" className="btn-gold mt-6">Back to Menu</Link>
      </div>
    );
  }

  // ── Empty cart (no progress bar)
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center px-6 py-24">
        <ShoppingBag size={64} className="text-cream-300 mx-auto mb-6" />
        <h2 className="font-serif text-3xl text-chocolate-600 mb-4">
          Your cart is empty
        </h2>
        <p className="text-chocolate-400 mb-8">
          Head to our menu and add some treats.
        </p>
        <Link href="/menu" className="btn-gold">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="min-h-screen bg-cream-100">

        {/* ── Progress Bar ─────────────────────────────────────────── */}
        <div className="bg-cream-200 py-5 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start justify-between relative z-0">
              {/* Connecting track */}
              <div className="absolute h-px bg-cream-300 top-4 left-[2rem] right-[2rem]" />
              {/* Gold fill overlay */}
              <div
                className="absolute bg-gold-500 h-px top-4 left-[2rem] transition-all duration-500"
                style={{ width: `calc((100% - 4rem) * ${(currentStep - 1) / 3})` }}
              />
              {([1, 2, 3, 4] as const).map((step) => {
                const isCompleted = step < currentStep;
                const isActive = step === currentStep;
                const label = STEP_LABELS[step - 1];
                return (
                  <div key={step} className="flex flex-col items-center gap-2 relative z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-gold-500"
                          : isActive
                          ? "bg-chocolate-800 border-2 border-gold-500"
                          : `bg-cream-300 ${deliveryOption === "delivery" ? "opacity-40" : ""}`
                      }`}
                    >
                      {isCompleted ? (
                        <Check size={14} className="text-chocolate-800" />
                      ) : (
                        <span
                          className={`text-xs font-bold ${
                            isActive ? "text-gold-500" : "text-chocolate-400"
                          }`}
                        >
                          {step}
                        </span>
                      )}
                    </div>
                    <span
                      className={`hidden sm:block text-xs tracking-widest uppercase ${
                        isActive
                          ? "text-chocolate-800 font-semibold"
                          : isCompleted
                          ? "text-gold-600"
                          : "text-chocolate-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

          {/* ── Step 1: Your Basket ──────────────────────────────── */}
          {currentStep === 1 && (
            <div className="step-enter">
              <h2 className="font-serif text-3xl text-chocolate-800 mb-2">Your Basket</h2>
              <p className="text-chocolate-400 text-sm mb-8">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>
              <div className="bg-white divide-y divide-cream-200">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-5">
                    {item.image && (
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-chocolate-800 font-semibold truncate">
                        {item.name}
                      </h3>
                      <p className="text-gold-600 font-semibold text-sm">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: { id: item.id, quantity: item.quantity - 1 },
                            })
                          }
                          className="w-7 h-7 border border-cream-200 flex items-center justify-center hover:border-gold-500"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: { id: item.id, quantity: item.quantity + 1 },
                            })
                          }
                          className="w-7 h-7 border border-cream-200 flex items-center justify-center hover:border-gold-500"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({ type: "REMOVE_ITEM", payload: item.id })
                          }
                          className="ml-auto text-cream-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <span className="font-semibold text-chocolate-700 text-sm whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-chocolate-800 p-5 flex justify-between items-center">
                <span className="text-cream-200 tracking-wider uppercase text-sm">Total</span>
                <span className="font-serif text-2xl text-gold-500">{formatPrice(total)}</span>
              </div>
              <button
                type="button"
                onClick={() => navigate(2)}
                className="btn-gold w-full mt-6"
              >
                Continue to Delivery
              </button>
            </div>
          )}

          {/* ── Step 2: Receive ──────────────────────────────────── */}
          {currentStep === 2 && (
            <div className="step-enter">
              <h2 className="font-serif text-3xl text-chocolate-800 mb-2">Receive Your Order</h2>
              <p className="text-chocolate-400 text-sm mb-8">
                Choose how you&apos;d like to get your order
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pickup card */}
                <button
                  type="button"
                  onClick={() => setDeliveryOption("pickup")}
                  className={`flex flex-col items-start p-6 border-2 text-left transition-all duration-200 ${
                    deliveryOption === "pickup"
                      ? "border-gold-500 bg-gold-50 shadow-sm"
                      : "border-cream-200 hover:border-cream-300 bg-white"
                  }`}
                >
                  <MapPin size={24} className="text-gold-500 mb-3" />
                  <span className="font-serif text-lg text-chocolate-800 font-semibold mb-1">
                    Pick Up at Azzeman Hotel
                  </span>
                  <span className="text-xs text-chocolate-400">
                    Azzeman Hotel, Addis Ababa
                  </span>
                </button>

                {/* Delivery card */}
                <button
                  type="button"
                  onClick={() => {
                    setDeliveryOption("delivery");
                    setTelebirrRef("");
                    setScreenshotBase64(null);
                    setScreenshotPreview(null);
                  }}
                  className={`flex flex-col items-start p-6 border-2 text-left transition-all duration-200 ${
                    deliveryOption === "delivery"
                      ? "border-gold-500 bg-gold-50 shadow-sm"
                      : "border-cream-200 hover:border-cream-300 bg-white"
                  }`}
                >
                  <Truck size={24} className="text-gold-500 mb-3" />
                  <span className="font-serif text-lg text-chocolate-800 font-semibold mb-1">
                    Delivery to Your Door
                  </span>
                  <span className="text-xs text-chocolate-400">
                    Order through a delivery partner
                  </span>
                </button>
              </div>

              {/* Delivery expand panel */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  deliveryOption === "delivery"
                    ? "max-h-96 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-white border border-cream-200 p-6 space-y-3">
                  <p className="text-xs text-chocolate-500 text-center tracking-widest uppercase mb-4">
                    Choose a delivery app
                  </p>
                  {DELIVERY_APPS.map((app) => (
                    <a
                      key={app.name}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDeliveryRedirected(true)}
                      className="flex items-center justify-between w-full px-5 py-3.5 bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 transition-colors"
                    >
                      <div>
                        <span className="font-semibold text-sm tracking-wide">{app.name}</span>
                        <span className="text-cream-400 text-xs ml-2">{app.description}</span>
                      </div>
                      <ExternalLink size={14} className="text-gold-400" />
                    </a>
                  ))}
                  <p className="text-xs text-chocolate-400 text-center leading-relaxed pt-1">
                    Search for &ldquo;The Dessert Bar&rdquo; in your chosen app to place a
                    delivery order.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {deliveryOption === "pickup" && (
                  <button
                    type="button"
                    onClick={() => navigate(3)}
                    className="btn-gold w-full"
                  >
                    Continue to Your Details
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => navigate(1)}
                  className="block w-full text-center text-sm text-chocolate-500 uppercase tracking-widest hover:text-chocolate-800 transition-colors"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Your Details ─────────────────────────────── */}
          {currentStep === 3 && (
            <div className="step-enter">
              <h2 className="font-serif text-3xl text-chocolate-800 mb-2">Your Details</h2>
              <p className="text-chocolate-400 text-sm mb-8">How should we contact you?</p>

              <div className="bg-white p-6 sm:p-8 space-y-5">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                    placeholder="Selam Tadesse"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                    placeholder="+251 91 234 5678"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                    placeholder="selam@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                    Special Notes
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={2}
                    className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm resize-none"
                    placeholder="Allergies, special requests..."
                  />
                </div>
              </div>

              {stepError && (
                <p className="text-red-500 text-sm mt-4">{stepError}</p>
              )}

              <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => navigate(2)}
                  className="text-sm text-chocolate-500 uppercase tracking-widest hover:text-chocolate-800 transition-colors text-center sm:text-left"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!form.customerName.trim()) return setStepError("Please enter your full name.");
                    if (!form.phone.trim()) return setStepError("Please enter your phone number.");
                    if (!form.email.trim()) return setStepError("Please enter your email.");
                    navigate(4);
                  }}
                  className="btn-gold"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* ── Step 4: Payment ──────────────────────────────────── */}
          {currentStep === 4 && (
            <div className="step-enter">
              <h2 className="font-serif text-3xl text-chocolate-800 mb-2">Payment</h2>
              <p className="text-chocolate-400 text-sm mb-8">How would you like to pay?</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cash card */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("cash");
                    setTelebirrRef("");
                    setScreenshotBase64(null);
                    setScreenshotPreview(null);
                  }}
                  className={`flex flex-col items-start p-6 border-2 text-left transition-all duration-200 ${
                    paymentMethod === "cash"
                      ? "border-gold-500 bg-gold-50 shadow-sm"
                      : "border-cream-200 hover:border-cream-300 bg-white"
                  }`}
                >
                  <Banknote size={24} className="text-gold-500 mb-3" />
                  <span className="font-serif text-lg text-chocolate-800 font-semibold mb-1">
                    Cash on Pickup
                  </span>
                  <span className="text-xs text-chocolate-400">Pay when you collect</span>
                </button>

                {/* Telebirr card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("telebirr")}
                  className={`flex flex-col items-start p-6 border-2 text-left transition-all duration-200 ${
                    paymentMethod === "telebirr"
                      ? "border-green-500 bg-green-50 shadow-sm"
                      : "border-cream-200 hover:border-cream-300 bg-white"
                  }`}
                >
                  <Smartphone size={24} className="text-green-600 mb-3" />
                  <span className="font-serif text-lg text-chocolate-800 font-semibold mb-1">
                    Telebirr
                  </span>
                  <span className="text-xs text-chocolate-400">
                    Pay via Ethio Telecom mobile money
                  </span>
                </button>
              </div>

              {/* Telebirr expand panel — max-h-[600px] to fit screenshot preview */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  paymentMethod === "telebirr"
                    ? "max-h-[600px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-green-50 border border-green-200 p-5 space-y-4">
                  <p className="text-xs text-green-800 font-semibold uppercase tracking-wider">
                    How to pay with Telebirr
                  </p>
                  <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside leading-relaxed">
                    <li>
                      Open your Telebirr app and send{" "}
                      <strong>{formatPrice(total)}</strong> to:
                    </li>
                  </ol>
                  <div className="bg-white border border-green-300 rounded px-4 py-2.5 text-center">
                    <p className="text-xs text-green-600 tracking-widest uppercase mb-1">
                      Telebirr Number
                    </p>
                    <p className="font-mono font-bold text-green-800 text-lg">
                      {TELEBIRR_NUMBER}
                    </p>
                  </div>
                  <ol
                    className="text-xs text-green-700 space-y-1 list-decimal list-inside leading-relaxed"
                    start={2}
                  >
                    <li>
                      Copy the transaction reference number from your Telebirr confirmation
                      message and paste it below.
                    </li>
                    <li>Take a screenshot of the confirmation and upload it.</li>
                    <li>Place your order — we&apos;ll verify and confirm by phone.</li>
                  </ol>

                  {/* Transaction reference */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-green-700 mb-2">
                      Transaction Reference *
                    </label>
                    <input
                      type="text"
                      value={telebirrRef}
                      onChange={(e) => {
                        setTelebirrRef(e.target.value);
                        setError("");
                      }}
                      className="w-full border border-green-300 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-green-500 text-sm bg-white font-mono"
                      placeholder="e.g. TB2024XXXXXXXX"
                    />
                  </div>

                  {/* Screenshot upload */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-green-700 mb-2">
                      Payment Screenshot *
                    </label>
                    {screenshotPreview ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={screenshotPreview}
                          alt="Payment confirmation"
                          className="w-full max-h-56 object-contain border border-green-300 bg-white"
                        />
                        <button
                          type="button"
                          onClick={clearScreenshot}
                          className="absolute top-1.5 right-1.5 bg-white border border-red-300 text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-colors"
                          title="Remove screenshot"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-green-300 bg-white p-5 cursor-pointer hover:bg-green-50 transition-colors">
                        <Upload size={22} className="text-green-500" />
                        <span className="text-xs text-green-700 font-medium">
                          Tap to upload screenshot
                        </span>
                        <span className="text-xs text-green-500">
                          JPG, PNG or WEBP — max 5 MB
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleScreenshot}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <button
                type="button"
                onClick={() => navigate(3)}
                className="block w-full text-center text-sm text-chocolate-500 uppercase tracking-widest hover:text-chocolate-800 transition-colors mt-4"
              >
                ← Back
              </button>
            </div>
          )}

        </div>
      </div>
    </form>
  );
}
