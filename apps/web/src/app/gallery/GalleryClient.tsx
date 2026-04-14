"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  caption?: string | null;
}

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <>
      <section className="bg-cream-100 py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="break-inside-avoid relative overflow-hidden group cursor-pointer bg-cream-200"
                onClick={() => setLightbox(idx)}
              >
                <div className="relative">
                  <Image
                    src={img.url}
                    alt={img.caption || "Gallery image"}
                    width={800}
                    height={600}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-chocolate-900/0 group-hover:bg-chocolate-900/40 transition-all duration-500 flex items-end">
                    {img.caption && (
                      <p className="text-cream-100 text-sm px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-serif italic">
                        {img.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center py-20 text-chocolate-400">
              <p className="font-serif text-2xl">Gallery coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-chocolate-900/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 text-cream-200 hover:text-gold-500 transition-colors z-10"
          >
            <ChevronLeft size={40} />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].url}
              alt={images[lightbox].caption || ""}
              width={1200}
              height={900}
              className="max-h-[80vh] w-full object-contain"
            />
            {images[lightbox].caption && (
              <p className="text-cream-200 text-center mt-4 font-serif italic opacity-70">
                {images[lightbox].caption}
              </p>
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 text-cream-200 hover:text-gold-500 transition-colors z-10"
          >
            <ChevronRight size={40} />
          </button>

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-cream-200 hover:text-gold-500 transition-colors"
          >
            <X size={28} />
          </button>

          <div className="absolute bottom-4 text-cream-200 opacity-40 text-sm tracking-widest">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
