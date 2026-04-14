export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}
