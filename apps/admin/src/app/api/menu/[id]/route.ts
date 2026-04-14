export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const item = await prisma.menuItem.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(item);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.orderItem.deleteMany({ where: { menuItemId: params.id } });
  await prisma.menuItem.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
