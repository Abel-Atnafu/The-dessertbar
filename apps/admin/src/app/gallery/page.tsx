export const dynamic = "force-dynamic";

import AdminLayout from "@/components/AdminLayout";
import GalleryClient from "./GalleryClient";
import { prisma } from "@dessertbar/db";

async function getGallery() {
  return prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
}

const DbError = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
    <p className="font-semibold mb-1">Failed to load data</p>
    <p className="text-sm">Could not connect to the database. Please check your DATABASE_URL.</p>
  </div>
);

export default async function AdminGalleryPage() {
  let images;
  try {
    images = await getGallery();
  } catch (error) {
    console.error("Gallery page error:", error);
    return <AdminLayout><div className="p-8"><h1 className="text-2xl font-bold text-gray-900 mb-8">Gallery</h1><DbError /></div></AdminLayout>;
  }

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
