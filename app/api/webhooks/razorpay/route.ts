import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { db } from "@/lib/db";
export const runtime = "nodejs";
export async function POST(req: Request) {
  if (!process.env.RAZORPAY_KEY_SECRET) return NextResponse.json({ error: "Razorpay is not configured" }, { status: 503 });
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  const expected = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
  if (expected !== signature) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  const event = JSON.parse(body);
  const payment = event.payload?.payment?.entity;
  if (event.event === "payment.captured" && payment?.order_id) await db.order.updateMany({ where: { paymentReference: payment.order_id }, data: { paymentStatus: "PAID", status: "CONFIRMED" } });
  return NextResponse.json({ received: true });
}
