export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@dessertbar/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, occasion, cakeSize, layers, flavor, frosting, design, colors, pickupDate, pickupTime, budget, notes } = body;

    if (!name || !email || !phone || !occasion || !cakeSize || !flavor || !frosting || !design || !pickupDate || !pickupTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await prisma.customCakeOrder.create({
      data: {
        name, email, phone, occasion, cakeSize,
        layers: Number(layers) || 1,
        flavor, frosting, design,
        colors: colors || null,
        pickupDate, pickupTime,
        budget: budget ? Number(budget) : null,
        notes: notes || null,
      },
    });

    // Optional confirmation email
    if (process.env.RESEND_API_KEY) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "The Dessert Bar <orders@thedessertbar.com>",
          to: email,
          subject: "Custom Cake Request Received — The Dessert Bar",
          html: `
            <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;background:#FAF7F2;padding:32px;">
              <h1 style="font-size:28px;color:#2C1A0E;margin:0 0 4px;">The Dessert Bar</h1>
              <p style="color:#C9A84C;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 24px;">Fine Patisserie & Cafe</p>
              <h2 style="font-size:20px;color:#2C1A0E;margin:0 0 8px;">Custom Cake Request Received!</h2>
              <p style="color:#5C3822;font-size:14px;margin:0 0 16px;">Hi ${name}, we've received your custom cake request. We'll review it and call you within 24 hours to confirm the details and price.</p>
              <div style="background:#fff;border:1px solid #EDE3D4;padding:20px;font-size:13px;color:#5C3822;">
                <p><strong>Occasion:</strong> ${occasion}</p>
                <p><strong>Size:</strong> ${cakeSize} · ${layers} layer(s)</p>
                <p><strong>Flavor:</strong> ${flavor} · ${frosting} frosting</p>
                <p><strong>Pickup:</strong> ${pickupDate} ${pickupTime}</p>
              </div>
              <p style="color:#8B4513;font-size:12px;margin-top:20px;">Azzeman Hotel, Addis Ababa · +251 90 018 2929</p>
            </div>`,
        }),
      }).catch(() => {});
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Custom cake order error:", error);
    return NextResponse.json({ error: "Failed to submit cake order" }, { status: 500 });
  }
}
