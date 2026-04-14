"use client";

import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { state, dispatch, total, itemCount } = useCart();

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-chocolate-900/60 backdrop-blur-sm z-40"
        onClick={() => dispatch({ type: "CLOSE_CART" })}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-cream-50 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200 bg-chocolate-800">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold-500" />
            <h2 className="font-serif text-xl text-cream-100">Your Order</h2>
            <span className="bg-gold-500 text-chocolate-800 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="text-cream-200 hover:text-gold-500 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={48} className="text-cream-300" />
              <p className="font-serif text-xl text-chocolate-600">
                Your cart is empty
              </p>
              <p className="text-sm text-chocolate-500 opacity-70">
                Add some delicious treats to get started.
              </p>
              <button
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="btn-gold mt-2"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-cream-200">
              {state.items.map((item) => (
                <li key={item.id} className="py-4 flex gap-4">
                  {item.image && (
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-chocolate-800 text-sm font-semibold truncate">
                      {item.name}
                    </h3>
                    <p className="text-gold-600 font-semibold text-sm mt-1">
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
                        className="w-6 h-6 border border-cream-300 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold text-chocolate-800 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                        className="w-6 h-6 border border-cream-300 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_ITEM", payload: item.id })
                        }
                        className="ml-auto text-cream-300 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-cream-200 px-6 py-5 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-chocolate-600 text-sm">Subtotal</span>
              <span className="font-serif text-chocolate-800 text-xl font-semibold">
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href="/order"
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="btn-gold w-full text-center block"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="w-full text-center text-xs text-chocolate-400 hover:text-red-400 transition-colors mt-3 tracking-widest uppercase"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
