export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, email, phone, notes, items, total } = body;

    if (!customerName || !email || !phone || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        email,
        phone,
        notes: notes || null,
        total,
        items: {
          create: items.map((item: { menuItemId: string; quantity: number; price: number }) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
