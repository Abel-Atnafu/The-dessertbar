"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const CATEGORIES = ["Cakes", "Pastries", "Drinks", "Specials"];

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string | null;
  available: boolean;
  featured: boolean;
}

const emptyForm = {
  name: "", description: "", price: "", category: "Cakes",
  image: "", available: true, featured: false,
};

export default function MenuClient({ initialItems }: { initialItems: MenuItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openCreate = () => {
    setEditItem(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditItem(item);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image || "",
      available: item.available,
      featured: item.featured,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = { ...form, price: parseFloat(form.price) };

    if (editItem) {
      const res = await fetch(`/api/menu/${editItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === editItem.id ? updated : i)));
    } else {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
    }

    setShowModal(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteConfirm(null);
  };

  const toggleAvailable = async (item: MenuItem) => {
    const res = await fetch(`/api/menu/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, available: !item.available }),
    });
    const updated = await res.json();
    setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button onClick={openCreate} className="flex items-center gap-2 bg-yellow-500 text-gray-900 font-semibold px-5 py-2.5 text-sm hover:bg-yellow-400 transition-colors">
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Item</th>
              <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-sm text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded ml-1">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  {formatPrice(item.price)}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleAvailable(item)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                      item.available
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {item.available ? <Check size={11} /> : <X size={11} />}
                    {item.available ? "Available" : "Hidden"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                    >
                      <Pencil size={15} />
                    </button>
                    {deleteConfirm === item.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-semibold text-gray-900">
                {editItem ? "Edit Menu Item" : "Add Menu Item"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
                    placeholder="Velvet Dream Cake"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Price *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
                    placeholder="8.50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 resize-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Image URL</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="available"
                    checked={form.available}
                    onChange={(e) => setForm({ ...form, available: e.target.checked })}
                    className="w-4 h-4 accent-yellow-500"
                  />
                  <label htmlFor="available" className="text-sm text-gray-700">Available</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-yellow-500"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">Featured on Home</label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading} className="flex-1 bg-yellow-500 text-gray-900 font-semibold py-2.5 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50">
                  {loading ? "Saving..." : editItem ? "Update Item" : "Create Item"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-5 bg-gray-100 text-gray-700 font-medium py-2.5 text-sm hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
