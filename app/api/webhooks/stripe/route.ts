import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const runtime = "nodejs";
export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: "Stripe webhook is not configured" }, { status: 503 });
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  const payload = await req.text();
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;
      if (orderId) await db.order.update({ where: { id: orderId }, data: { paymentStatus: "PAID", status: "CONFIRMED", paymentReference: session.payment_intent?.toString() } });
    }
    return NextResponse.json({ received: true });
  } catch { return NextResponse.json({ error: "Invalid webhook" }, { status: 400 }); }
}
