"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, X, Images } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  caption?: string | null;
  sortOrder: number;
}

export default function GalleryClient({
  initialImages,
}: {
  initialImages: GalleryImage[];
}) {
  const [images, setImages] = useState(initialImages);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ url: "", caption: "" });
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const created = await res.json();
    setImages((prev) => [...prev, created]);
    setForm({ url: "", caption: "" });
    setShowModal(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setImages((prev) => prev.filter((img) => img.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-yellow-500 text-gray-900 font-semibold px-5 py-2.5 text-sm hover:bg-yellow-400 transition-colors"
        >
          <Plus size={16} />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <Image
              src={img.url}
              alt={img.caption || "Gallery image"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-end">
              <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                {img.caption && (
                  <p className="text-white text-xs mb-2 truncate">{img.caption}</p>
                )}
                {deleteConfirm === img.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="flex-1 bg-red-500 text-white text-xs py-1.5 rounded font-medium"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 bg-gray-200 text-gray-700 text-xs py-1.5 rounded font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(img.id)}
                    className="w-full flex items-center justify-center gap-1 bg-red-500/80 hover:bg-red-500 text-white text-xs py-1.5 rounded font-medium transition-colors"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-4 flex flex-col items-center justify-center py-20 text-gray-400">
            <Images size={40} className="mb-3 opacity-30" />
            <p>No images yet. Add your first gallery image.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-semibold text-gray-900">Add Gallery Image</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Image URL *</label>
                <input
                  required
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              {form.url && (
                <div className="relative h-40 rounded overflow-hidden bg-gray-100">
                  <Image src={form.url} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Caption</label>
                <input
                  type="text"
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
                  placeholder="Optional caption..."
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="flex-1 bg-yellow-500 text-gray-900 font-semibold py-2.5 text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50">
                  {loading ? "Adding..." : "Add Image"}
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
