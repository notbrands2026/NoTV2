"use client";
import { useState } from "react";
export default function Admin() {
  const [token,setToken]=useState(""); const [orders,setOrders]=useState<any[]>([]); const [error,setError]=useState("");
  async function load(){ setError(""); const r=await fetch("/api/orders",{headers:{"x-admin-token":token}}); const d=await r.json(); if(!r.ok){setError(d.error||"Unable to load orders");return;} setOrders(d.orders||[]); }
  return <main className="checkoutPage"><header className="simpleHeader"><a className="brand" href="/"><img src="/not-logo.png" alt="NoT"/></a><a href="/">← Store</a></header><div className="checkoutWrap"><div><p className="eyebrow">NO T · ADMIN</p><h1>Order management.</h1><p className="muted">Enter the ADMIN_TOKEN configured in Vercel.</p><input value={token} onChange={e=>setToken(e.target.value)} placeholder="Admin token" type="password"/><button className="primary" onClick={load}>Load orders</button>{error&&<p className="formError">{error}</p>}<div className="adminOrders">{orders.map(o=><article className="adminOrder" key={o.id}><div><strong>{o.orderNumber}</strong><small>{new Date(o.createdAt).toLocaleString("en-IN")}</small></div><div><strong>₹{o.total.toLocaleString("en-IN")}</strong><small>{o.status} · {o.paymentStatus}</small></div><p>{o.shippingName} · {o.shippingEmail}</p></article>)}</div></div></div></main>;
}
