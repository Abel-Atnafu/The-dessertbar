export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function GET() {
  const items = await prisma.menuItem.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await prisma.menuItem.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
