import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
const authorized = (req: Request) => Boolean(process.env.ADMIN_TOKEN) && req.headers.get("x-admin-token") === process.env.ADMIN_TOKEN;

export async function GET(req: Request) {
  const admin = authorized(req);
  const products = await db.product.findMany({
    where: admin ? undefined : { active: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const name = String(body.name || "").trim();
  const category = String(body.category || "").trim();
  const description = String(body.description || "").trim();
  const price = Number(body.price);
  const stock = Number(body.stock);
  if (!name || !category || !description || !Number.isInteger(price) || price < 0 || !Number.isInteger(stock) || stock < 0) {
    return NextResponse.json({ error: "Enter a valid name, category, description, price and stock." }, { status: 400 });
  }
  const product = await db.product.create({ data: { name, category, description, price, stock, imageUrl: String(body.imageUrl || "").trim() || null, tag: String(body.tag || "").trim() || null, active: body.active !== false } });
  return NextResponse.json({ product }, { status: 201 });
}
