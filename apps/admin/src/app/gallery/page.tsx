export const dynamic = "force-dynamic";

import AdminLayout from "@/components/AdminLayout";
import GalleryClient from "./GalleryClient";
import { prisma } from "@dessertbar/db";

async function getGallery() {
  return prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
}

export default async function AdminGalleryPage() {
  const images = await getGallery();

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">{images.length} images</p>
        </div>
        <GalleryClient initialImages={JSON.parse(JSON.stringify(images))} />
      </div>
    </AdminLayout>
  );
}
