"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const products = [
  { id: 1, name: "NoT Essential Tee", price: 799, category: "Apparel" },
  { id: 2, name: "Need of Time Hoodie", price: 1499, category: "Apparel" },
  { id: 3, name: "NoT Signature Cap", price: 599, category: "Accessories" },
  { id: 4, name: "NoT Everyday Tote", price: 449, category: "Accessories" },
  { id: 5, name: "Timekeeper Journal", price: 349, category: "Lifestyle" },
  { id: 6, name: "NoT Classic Bottle", price: 699, category: "Lifestyle" },
];

type Form = { name: string; email: string; phone: string; address: string; city: string; state: string; pincode: string };
const emptyForm: Form = { name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" };

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState<number[]>([]);
  const [form, setForm] = useState<Form>(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem("not-cart") || "[]")); } catch { setCart([]); }
  }, []);

  const items = useMemo(() => cart.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products, [cart]);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const money = (v: number) => `₹${v.toLocaleString("en-IN")}`;

  function update(key: keyof Form, value: string) { setForm((f) => ({ ...f, [key]: value })); }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault(); setError("");
    if (!items.length) { setError("Your bag is empty. Add products before checkout."); return; }
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      setError("Please complete all delivery details."); return;
    }
    setSubmitting(true);
    const orderId = `NOT-${Date.now().toString(36).toUpperCase()}`;
    const order = { orderId, createdAt: new Date().toISOString(), customer: form, items, total };
    localStorage.setItem("not-last-order", JSON.stringify(order));
    localStorage.setItem("not-cart", "[]");
    router.push(`/order-success?order=${orderId}`);
  }

  return <main className="checkoutPage">
    <header className="simpleHeader"><Link href="/" className="brand"><img src="/not-logo.png" alt="NoT — Need of Time" /></Link><Link href="/">← Back to shop</Link></header>
    <div className="checkoutWrap">
      <div><p className="eyebrow">NO T · CHECKOUT</p><h1>Complete your order.</h1>
        <form onSubmit={placeOrder} className="checkoutForm">
          <section><h2>Delivery details</h2><div className="formGrid">
            <label>Full name<input value={form.name} onChange={e=>update("name",e.target.value)} /></label>
            <label>Email<input type="email" value={form.email} onChange={e=>update("email",e.target.value)} /></label>
            <label>Phone<input inputMode="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} /></label>
            <label className="wide">Address<input value={form.address} onChange={e=>update("address",e.target.value)} /></label>
            <label>City<input value={form.city} onChange={e=>update("city",e.target.value)} /></label>
            <label>State<input value={form.state} onChange={e=>update("state",e.target.value)} /></label>
            <label>PIN code<input inputMode="numeric" value={form.pincode} onChange={e=>update("pincode",e.target.value)} /></label>
          </div></section>
          <section><h2>Payment</h2><div className="paymentNotice"><strong>Stage 3 checkout</strong><p>Your order flow is active. Connect Stripe/Razorpay in production to accept live payments; this build does not collect card details.</p></div></section>
          {error && <p className="formError">{error}</p>}
          <button className="primary full" disabled={submitting}>{submitting ? "Processing…" : `Place order · ${money(total)}`}</button>
        </form>
      </div>
      <aside className="summary"><h2>Order summary</h2>{items.length ? items.map((item,i)=><div className="summaryItem" key={`${item.id}-${i}`}><span>{item.name}</span><strong>{money(item.price)}</strong></div>) : <p className="muted">Your bag is empty.</p>}<div className="summaryTotal"><span>Total</span><strong>{money(total)}</strong></div></aside>
    </div>
  </main>;
}
