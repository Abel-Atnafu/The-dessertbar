import { NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function GET() {
  try {
    const cakes = await prisma.customCakeOrder.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(cakes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch cake orders" }, { status: 500 });
  }
}
