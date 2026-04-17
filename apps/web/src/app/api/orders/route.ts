export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, email, phone, notes, items, total, paymentMethod, paymentReference, paymentScreenshot } = body;

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
        paymentMethod: paymentMethod || null,
        paymentReference: paymentReference || null,
        paymentScreenshot: paymentScreenshot || null,
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

    // Send confirmation email — fires and forgets, never blocks the order
    if (process.env.RESEND_API_KEY) {
      const itemRows = order.items.map((i: { price: number; quantity: number; menuItemId: string }) =>
        `<tr><td style="padding:6px 0;color:#5C3822;">${i.menuItemId}</td><td style="padding:6px 0;text-align:right;color:#5C3822;">ETB ${(i.price * i.quantity).toFixed(0)}</td></tr>`
      ).join("");
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "The Dessert Bar <orders@thedessertbar.com>",
          to: email,
          subject: `Order Confirmed — The Dessert Bar (#${order.id.slice(-6).toUpperCase()})`,
          html: `
            <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;background:#FAF7F2;padding:32px;">
              <h1 style="font-size:28px;color:#2C1A0E;margin:0 0 4px;">The Dessert Bar</h1>
              <p style="color:#C9A84C;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 24px;">Fine Patisserie & Cafe</p>
              <h2 style="font-size:20px;color:#2C1A0E;margin:0 0 8px;">Order Confirmed!</h2>
              <p style="color:#5C3822;font-size:14px;margin:0 0 24px;">Hi ${customerName}, your order has been received. We'll call you shortly to confirm when it's ready for pickup.</p>
              <div style="background:#fff;border:1px solid #EDE3D4;padding:20px;margin-bottom:20px;">
                <p style="font-size:11px;color:#8B4513;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Order #${order.id.slice(-6).toUpperCase()}</p>
                <table style="width:100%;border-collapse:collapse;">${itemRows}</table>
                <hr style="border:none;border-top:1px solid #EDE3D4;margin:12px 0;"/>
                <div style="display:flex;justify-content:space-between;font-weight:bold;color:#2C1A0E;">
                  <span>Total</span><span>ETB ${total}</span>
                </div>
              </div>
              <p style="color:#5C3822;font-size:13px;margin:0 0 4px;">Payment: ${paymentMethod || "Cash on Pickup"}</p>
              <p style="color:#8B4513;font-size:12px;margin:0;">Azzeman Hotel, Addis Ababa · +251 90 018 2929</p>
            </div>`,
        }),
      }).catch(() => {}); // never crash on email failure
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
