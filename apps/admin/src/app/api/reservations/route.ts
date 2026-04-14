export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reservations);
}
