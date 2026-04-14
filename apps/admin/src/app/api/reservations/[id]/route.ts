import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();
  const reservation = await prisma.reservation.update({
    where: { id: params.id },
    data: { status },
  });
  return NextResponse.json(reservation);
}
