import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const runtime = "nodejs";
function authorized(req: Request) { return process.env.ADMIN_TOKEN && req.headers.get("x-admin-token") === process.env.ADMIN_TOKEN; }
export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const orders = await db.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ orders });
}
