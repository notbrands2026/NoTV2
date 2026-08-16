"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Success() {
  const [order, setOrder] = useState<any>(null);
  useEffect(() => { try { setOrder(JSON.parse(localStorage.getItem("not-last-order") || "null")); } catch {} }, []);
  return <main className="successPage"><img src="/not-logo-taupe.png" alt="NoT"/><p className="eyebrow">ORDER CONFIRMED</p><h1>Thank you.</h1><p>Your NoT order has been received.</p>{order && <div className="orderCard"><span>Order number</span><strong>{order.orderId}</strong><span>Total</span><strong>₹{Number(order.total).toLocaleString("en-IN")}</strong><span>Delivery to</span><strong>{order.customer.name}, {order.customer.city}</strong></div>}<Link className="primary" href="/">Continue shopping</Link></main>;
}
