export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function GET() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const { url, caption } = await req.json();
  const count = await prisma.galleryImage.count();
  const image = await prisma.galleryImage.create({
    data: { url, caption, sortOrder: count + 1 },
  });
  return NextResponse.json(image, { status: 201 });
}
