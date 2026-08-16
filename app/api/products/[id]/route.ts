import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
const authorized = (req: Request) => Boolean(process.env.ADMIN_TOKEN) && req.headers.get("x-admin-token") === process.env.ADMIN_TOKEN;

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const body = await req.json();
  const name = String(body.name || "").trim();
  const category = String(body.category || "").trim();
  const description = String(body.description || "").trim();
  const price = Number(body.price);
  const stock = Number(body.stock);
  if (!name || !category || !description || !Number.isInteger(price) || price < 0 || !Number.isInteger(stock) || stock < 0) {
    return NextResponse.json({ error: "Enter valid product details." }, { status: 400 });
  }
  const product = await db.product.update({ where: { id: Number(id) }, data: { name, category, description, price, stock, imageUrl: String(body.imageUrl || "").trim() || null, tag: String(body.tag || "").trim() || null, active: body.active !== false } });
  return NextResponse.json({ product });
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  await db.product.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
