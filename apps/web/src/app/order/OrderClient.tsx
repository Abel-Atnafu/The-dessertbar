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
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

// ─── Update these if the delivery app URLs change ──────────────────────────
const DELIVERY_APPS = [
  {
    name: "Ride",
    description: "Ride Ethiopia",
    url: "https://ride8294.com",
  },
  {
    name: "Fetan",
    description: "Fetan Delivery",
    url: "https://fetan.app",
  },
];

// Payment account details — update these with the actual business accounts
const TELEBIRR_NUMBER = "+251 90 018 2929";
const CBE_BIRR_ACCOUNT = "1000285634719";
const HELLOCASH_NUMBER = "+251 96 381 4702";
// ──────────────────────────────────────────────────────────────────────────

type DeliveryOption = "pickup" | "delivery";
type PaymentMethod = "cash" | "telebirr" | "cbebirr" | "hellocash";

interface FormData {
  customerName: string;
  email: string;
  phone: string;
  notes: string;
}

export default function OrderClient() {
  const { state, dispatch, total, itemCount } = useCart();

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
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [successPayment, setSuccessPayment] = useState<PaymentMethod>("cash");
  const [error, setError] = useState("");

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

    const mobilePayment = paymentMethod === "telebirr" || paymentMethod === "cbebirr" || paymentMethod === "hellocash";
    if (mobilePayment && !telebirrRef.trim()) {
      setError("Please enter your transaction reference number.");
      return;
    }
    if (mobilePayment && !screenshotBase64) {
      setError("Please upload a screenshot of your payment confirmation.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const mobilePayment = paymentMethod === "telebirr" || paymentMethod === "cbebirr" || paymentMethod === "hellocash";
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
          paymentReference: mobilePayment ? telebirrRef.trim() : null,
          paymentScreenshot: mobilePayment ? screenshotBase64 : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");
      const data = await res.json();
      dispatch({ type: "CLEAR_CART" });
      setSuccessOrderId(data.id ?? null);
      setSuccessPayment(paymentMethod);
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const mobilePayment = successPayment === "telebirr" || successPayment === "cbebirr" || successPayment === "hellocash";
    const paymentLabel = successPayment === "telebirr" ? "Telebirr" : successPayment === "cbebirr" ? "CBE Birr" : "HelloCash";
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="text-gold-500 mx-auto mb-6" />
          <h2 className="font-serif text-4xl text-chocolate-800 mb-4">
            Order Placed!
          </h2>
          <p className="text-chocolate-500 leading-relaxed mb-4">
            Thank you for your order. We&apos;ll call you shortly to confirm and
            let you know when it&apos;s ready.
          </p>
          {mobilePayment ? (
            <div className="bg-white p-4 mb-4 text-sm text-chocolate-600 leading-relaxed">
              <Smartphone size={18} className="text-green-600 inline mr-2 mb-0.5" />
              Your {paymentLabel} payment reference has been recorded. We&apos;ll
              verify it and confirm your order by phone.
            </div>
          ) : (
            <div className="bg-white p-4 mb-4 text-sm text-chocolate-600 leading-relaxed">
              Please have <strong>cash ready</strong> when you collect your
              order.
            </div>
          )}
          {successOrderId && (
            <div className="bg-white border border-gold-300 p-4 mb-8 text-sm">
              <p className="text-chocolate-400 text-xs tracking-widest uppercase mb-1">Order Number</p>
              <p className="font-mono font-bold text-chocolate-800 text-base mb-3">{successOrderId}</p>
              <Link href={`/track/${successOrderId}`} className="text-gold-600 hover:text-gold-700 text-xs font-semibold tracking-wider uppercase underline underline-offset-2">
                Track Your Order →
              </Link>
            </div>
          )}
          <Link href="/menu" className="btn-gold">
            Order Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {state.items.length === 0 ? (
          <div className="text-center py-24">
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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* ── Order Summary ─────────────────────────────────────── */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl text-chocolate-800 mb-6">
                Order Summary ({itemCount} items)
              </h2>
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
                <span className="text-cream-200 tracking-wider uppercase text-sm">
                  Total
                </span>
                <span className="font-serif text-2xl text-gold-500">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* ── Right Column ──────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* ── 1. How do you want to receive your order? ── */}
              <div>
                <h2 className="font-serif text-2xl text-chocolate-800 mb-4">
                  Receive Your Order
                </h2>
                <div className="bg-white p-5 space-y-3">
                  {/* Pickup */}
                  <label
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                      deliveryOption === "pickup"
                        ? "border-gold-500 bg-gold-50"
                        : "border-cream-200 hover:border-cream-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={deliveryOption === "pickup"}
                      onChange={() => setDeliveryOption("pickup")}
                      className="mt-0.5 accent-gold-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin size={15} className="text-gold-600" />
                        <span className="text-sm font-semibold text-chocolate-800 tracking-wide uppercase">
                          Pick Up
                        </span>
                      </div>
                      <p className="text-xs text-chocolate-400 mt-1">
                        Collect from The Dessert Bar — Azzeman Hotel, Addis
                        Ababa
                      </p>
                    </div>
                  </label>

                  {/* Delivery via app */}
                  <label
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                      deliveryOption === "delivery"
                        ? "border-gold-500 bg-gold-50"
                        : "border-cream-200 hover:border-cream-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="delivery"
                      checked={deliveryOption === "delivery"}
                      onChange={() => setDeliveryOption("delivery")}
                      className="mt-0.5 accent-gold-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck size={15} className="text-gold-600" />
                        <span className="text-sm font-semibold text-chocolate-800 tracking-wide uppercase">
                          Delivery to your door
                        </span>
                      </div>
                      <p className="text-xs text-chocolate-400 mt-1">
                        Order through one of our delivery partners
                      </p>
                    </div>
                  </label>

                  {/* Delivery app links */}
                  {deliveryOption === "delivery" && (
                    <div className="pt-2 space-y-3">
                      <p className="text-xs text-chocolate-500 text-center tracking-widest uppercase">
                        Choose a delivery app
                      </p>
                      {DELIVERY_APPS.map((app) => (
                        <a
                          key={app.name}
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full px-5 py-3.5 bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 transition-colors"
                        >
                          <div>
                            <span className="font-semibold text-sm tracking-wide">
                              {app.name}
                            </span>
                            <span className="text-cream-400 text-xs ml-2">
                              {app.description}
                            </span>
                          </div>
                          <ExternalLink size={14} className="text-gold-400" />
                        </a>
                      ))}
                      <p className="text-xs text-chocolate-400 text-center leading-relaxed pt-1">
                        Search for &ldquo;The Dessert Bar&rdquo; in your chosen
                        app to place a delivery order.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── 2. Customer details + payment (pickup only) ── */}
              {deliveryOption === "pickup" && (
                <div>
                  <h2 className="font-serif text-2xl text-chocolate-800 mb-4">
                    Your Details
                  </h2>
                  <form onSubmit={handleSubmit} className="bg-white p-6 space-y-5">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.customerName}
                        onChange={(e) =>
                          setForm({ ...form, customerName: e.target.value })
                        }
                        className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                        placeholder="Selam Tadesse"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                        placeholder="selam@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm"
                        placeholder="+251 91 234 5678"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-chocolate-500 mb-2">
                        Special Notes
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) =>
                          setForm({ ...form, notes: e.target.value })
                        }
                        rows={2}
                        className="w-full border border-cream-200 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-gold-500 text-sm resize-none"
                        placeholder="Allergies, special requests..."
                      />
                    </div>

                    {/* ── Payment method ── */}
                    <div>
                      <p className="text-xs tracking-widest uppercase text-chocolate-500 mb-3">
                        Payment Method *
                      </p>
                      <div className="space-y-2">
                        {/* Cash */}
                        <label
                          className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-colors ${
                            paymentMethod === "cash"
                              ? "border-gold-500 bg-gold-50"
                              : "border-cream-200 hover:border-cream-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={() => {
                              setPaymentMethod("cash");
                              setError("");
                            }}
                            className="accent-gold-500"
                          />
                          <div>
                            <span className="text-sm font-semibold text-chocolate-800">
                              Cash on Pickup
                            </span>
                            <p className="text-xs text-chocolate-400">
                              Pay when you collect your order
                            </p>
                          </div>
                        </label>

                        {/* Telebirr */}
                        <label
                          className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-colors ${
                            paymentMethod === "telebirr"
                              ? "border-gold-500 bg-gold-50"
                              : "border-cream-200 hover:border-cream-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="telebirr"
                            checked={paymentMethod === "telebirr"}
                            onChange={() => { setPaymentMethod("telebirr"); setError(""); }}
                            className="accent-gold-500"
                          />
                          <div className="flex items-center gap-2">
                            <Smartphone size={15} className="text-green-600" />
                            <div>
                              <span className="text-sm font-semibold text-chocolate-800">Telebirr</span>
                              <p className="text-xs text-chocolate-400">Ethio Telecom mobile money</p>
                            </div>
                          </div>
                        </label>

                        {/* CBE Birr */}
                        <label
                          className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-colors ${
                            paymentMethod === "cbebirr"
                              ? "border-gold-500 bg-gold-50"
                              : "border-cream-200 hover:border-cream-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="cbebirr"
                            checked={paymentMethod === "cbebirr"}
                            onChange={() => { setPaymentMethod("cbebirr"); setTelebirrRef(""); clearScreenshot(); setError(""); }}
                            className="accent-gold-500"
                          />
                          <div className="flex items-center gap-2">
                            <Smartphone size={15} className="text-blue-600" />
                            <div>
                              <span className="text-sm font-semibold text-chocolate-800">CBE Birr</span>
                              <p className="text-xs text-chocolate-400">Commercial Bank of Ethiopia</p>
                            </div>
                          </div>
                        </label>

                        {/* HelloCash */}
                        <label
                          className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-colors ${
                            paymentMethod === "hellocash"
                              ? "border-gold-500 bg-gold-50"
                              : "border-cream-200 hover:border-cream-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value="hellocash"
                            checked={paymentMethod === "hellocash"}
                            onChange={() => { setPaymentMethod("hellocash"); setTelebirrRef(""); clearScreenshot(); setError(""); }}
                            className="accent-gold-500"
                          />
                          <div className="flex items-center gap-2">
                            <Smartphone size={15} className="text-purple-600" />
                            <div>
                              <span className="text-sm font-semibold text-chocolate-800">HelloCash</span>
                              <p className="text-xs text-chocolate-400">Amhara Bank mobile wallet</p>
                            </div>
                          </div>
                        </label>
                      </div>

                      {/* Telebirr instructions */}
                      {paymentMethod === "telebirr" && (
                        <div className="mt-3 bg-green-50 border border-green-200 p-4 space-y-3">
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
                          <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside leading-relaxed" start={2}>
                            <li>
                              Copy the transaction reference number from your
                              Telebirr confirmation message and paste it below.
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
                      )}
                    </div>

                      {/* CBE Birr instructions */}
                      {paymentMethod === "cbebirr" && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 p-4 space-y-3">
                          <p className="text-xs text-blue-800 font-semibold uppercase tracking-wider">How to pay with CBE Birr</p>
                          <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside leading-relaxed">
                            <li>Open your CBE Birr app and send <strong>{formatPrice(total)}</strong> to:</li>
                          </ol>
                          <div className="bg-white border border-blue-300 rounded px-4 py-2.5 text-center">
                            <p className="text-xs text-blue-600 tracking-widest uppercase mb-1">CBE Account</p>
                            <p className="font-mono font-bold text-blue-800 text-lg">{CBE_BIRR_ACCOUNT}</p>
                          </div>
                          <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside leading-relaxed" start={2}>
                            <li>Copy the transaction reference from your confirmation and paste it below.</li>
                            <li>Take a screenshot and upload it, then place your order.</li>
                          </ol>
                          <div>
                            <label className="block text-xs tracking-widest uppercase text-blue-700 mb-2">Transaction Reference *</label>
                            <input type="text" value={telebirrRef} onChange={(e) => { setTelebirrRef(e.target.value); setError(""); }}
                              className="w-full border border-blue-300 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-blue-500 text-sm bg-white font-mono"
                              placeholder="e.g. CBE2024XXXXXXXX" />
                          </div>
                          <div>
                            <label className="block text-xs tracking-widest uppercase text-blue-700 mb-2">Payment Screenshot *</label>
                            {screenshotPreview ? (
                              <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={screenshotPreview} alt="Payment confirmation" className="w-full max-h-56 object-contain border border-blue-300 bg-white" />
                                <button type="button" onClick={clearScreenshot} className="absolute top-1.5 right-1.5 bg-white border border-red-300 text-red-500 hover:bg-red-50 rounded-full p-0.5"><X size={14} /></button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-blue-300 bg-white p-5 cursor-pointer hover:bg-blue-50 transition-colors">
                                <Upload size={22} className="text-blue-500" />
                                <span className="text-xs text-blue-700 font-medium">Tap to upload screenshot</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleScreenshot} />
                              </label>
                            )}
                          </div>
                        </div>
                      )}

                      {/* HelloCash instructions */}
                      {paymentMethod === "hellocash" && (
                        <div className="mt-3 bg-purple-50 border border-purple-200 p-4 space-y-3">
                          <p className="text-xs text-purple-800 font-semibold uppercase tracking-wider">How to pay with HelloCash</p>
                          <ol className="text-xs text-purple-700 space-y-1 list-decimal list-inside leading-relaxed">
                            <li>Open your HelloCash app and send <strong>{formatPrice(total)}</strong> to:</li>
                          </ol>
                          <div className="bg-white border border-purple-300 rounded px-4 py-2.5 text-center">
                            <p className="text-xs text-purple-600 tracking-widest uppercase mb-1">HelloCash Number</p>
                            <p className="font-mono font-bold text-purple-800 text-lg">{HELLOCASH_NUMBER}</p>
                          </div>
                          <ol className="text-xs text-purple-700 space-y-1 list-decimal list-inside leading-relaxed" start={2}>
                            <li>Copy the transaction reference from your confirmation and paste it below.</li>
                            <li>Take a screenshot and upload it, then place your order.</li>
                          </ol>
                          <div>
                            <label className="block text-xs tracking-widest uppercase text-purple-700 mb-2">Transaction Reference *</label>
                            <input type="text" value={telebirrRef} onChange={(e) => { setTelebirrRef(e.target.value); setError(""); }}
                              className="w-full border border-purple-300 px-4 py-3 text-chocolate-800 focus:outline-none focus:border-purple-500 text-sm bg-white font-mono"
                              placeholder="e.g. HC2024XXXXXXXX" />
                          </div>
                          <div>
                            <label className="block text-xs tracking-widest uppercase text-purple-700 mb-2">Payment Screenshot *</label>
                            {screenshotPreview ? (
                              <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={screenshotPreview} alt="Payment confirmation" className="w-full max-h-56 object-contain border border-purple-300 bg-white" />
                                <button type="button" onClick={clearScreenshot} className="absolute top-1.5 right-1.5 bg-white border border-red-300 text-red-500 hover:bg-red-50 rounded-full p-0.5"><X size={14} /></button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-purple-300 bg-white p-5 cursor-pointer hover:bg-purple-50 transition-colors">
                                <Upload size={22} className="text-purple-500" />
                                <span className="text-xs text-purple-700 font-medium">Tap to upload screenshot</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleScreenshot} />
                              </label>
                            )}
                          </div>
                        </div>
                      )}

                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Placing Order..." : "Place Order"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
