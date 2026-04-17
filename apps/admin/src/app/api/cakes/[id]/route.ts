import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    const cake = await prisma.customCakeOrder.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json(cake);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update cake order" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.customCakeOrder.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete cake order" }, { status: 500 });
  }
}
