import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";
import { verifyToken } from "@/lib/auth";

async function checkAuth(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function GET(req: NextRequest) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const images = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, caption } = await req.json();
  const count = await prisma.galleryImage.count();
  const image = await prisma.galleryImage.create({
    data: { url, caption, sortOrder: count + 1 },
  });
  return NextResponse.json(image, { status: 201 });
}
