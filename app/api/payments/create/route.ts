import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/products";

export const runtime = "nodejs";

function orderNumber() { return `NOT-${Date.now().toString(36).toUpperCase()}`; }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, provider = "razorpay" } = body;
    if (!customer?.name || !customer?.email || !customer?.phone || !customer?.address || !customer?.city || !customer?.state || !customer?.pincode || !Array.isArray(items) || !items.length) {
      return NextResponse.json({ error: "Complete customer details and cart are required." }, { status: 400 });
    }
    const cleanItems = items.map((id: number) => products.find(p => p.id === Number(id))).filter(Boolean);
    if (cleanItems.length !== items.length) return NextResponse.json({ error: "One or more products are invalid." }, { status: 400 });
    const total = cleanItems.reduce((sum, p) => sum + p!.price, 0);
    const order = await db.order.create({ data: {
      orderNumber: orderNumber(), total, paymentProvider: provider.toUpperCase(),
      shippingName: customer.name, shippingEmail: customer.email, shippingPhone: customer.phone,
      shippingAddress: customer.address, shippingCity: customer.city, shippingState: customer.state, shippingPincode: customer.pincode,
      items: { create: cleanItems.map(p => ({ productId: p!.id, name: p!.name, price: p!.price, quantity: 1 })) }
    }});

    if (provider === "stripe") {
      if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: "Stripe is not configured. Add STRIPE_SECRET_KEY in Vercel." }, { status: 503 });
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.create({ mode: "payment", customer_email: customer.email,
        line_items: cleanItems.map(p => ({ price_data: { currency: "inr", product_data: { name: p!.name }, unit_amount: p!.price * 100 }, quantity: 1 })),
        metadata: { orderId: order.id, orderNumber: order.orderNumber },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-success?order=${order.orderNumber}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?payment=cancelled`
      });
      return NextResponse.json({ url: session.url, orderNumber: order.orderNumber });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return NextResponse.json({ error: "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel." }, { status: 503 });
    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    const paymentOrder = await razorpay.orders.create({ amount: total * 100, currency: "INR", receipt: order.orderNumber, notes: { orderId: order.id } });
    await db.order.update({ where: { id: order.id }, data: { paymentReference: paymentOrder.id } });
    return NextResponse.json({ razorpay: { key: process.env.RAZORPAY_KEY_ID, orderId: paymentOrder.id, amount: paymentOrder.amount, currency: paymentOrder.currency, name: "NoT — Need of Time", description: order.orderNumber }, orderNumber: order.orderNumber });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create payment." }, { status: 500 });
  }
}
