 "use client";

import "./globals.css";
import Link from "next/link";
import { useEffect } from "react";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  tag?: string;
};

const products: Product[] = [
  { id: 1, name: "NoT Essential Tee", category: "Apparel", price: 799, description: "Everyday heavyweight tee with the NoT identity.", tag: "New" },
  { id: 2, name: "Need of Time Hoodie", category: "Apparel", price: 1499, description: "Relaxed-fit hoodie built for everyday comfort.", tag: "Best Seller" },
  { id: 3, name: "NoT Signature Cap", category: "Accessories", price: 599, description: "Minimal cap with a clean embroidered mark." },
  { id: 4, name: "NoT Everyday Tote", category: "Accessories", price: 449, description: "Durable carry-all for work, travel and daily use." },
  { id: 5, name: "Timekeeper Journal", category: "Lifestyle", price: 349, description: "A simple premium journal for ideas, plans and notes." },
  { id: 6, name: "NoT Classic Bottle", category: "Lifestyle", price: 699, description: "Reusable bottle with a clean, timeless finish." },
];

const categories = ["All", "Apparel", "Accessories", "Lifestyle"];

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem("not-cart") || "[]")); } catch {}
  }, []);

  useEffect(() => { localStorage.setItem("not-cart", JSON.stringify(cart)); }, [cart]);

  const visibleProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const text = `${p.name} ${p.description} ${p.category}`.toLowerCase();
      return matchesCategory && text.includes(query.toLowerCase());
    });
  }, [category, query]);

  const cartProducts = cart.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  const total = cartProducts.reduce((sum, p) => sum + p.price, 0);

  function addToCart(id: number) {
    setCart((current) => [...current, id]);
  }

  function removeFromCart(index: number) {
    setCart((current) => current.filter((_, i) => i !== index));
  }

  const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

  return (
    <main className="site">
      <header className="header">
        <a href="#" className="brand"><img src="/not-logo.png" alt="NoT — Need of Time" /></a>
        <nav>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="cartButton" onClick={() => setCartOpen(true)} aria-label="Open cart">
            Bag <span>{cart.length}</span>
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">NO T · NEED OF TIME</p>
          <h1>Make time yours.</h1>
          <p className="lead">Thoughtful everyday products for people who move with purpose.</p>
          <a className="primary" href="#shop">Shop the collection</a>
        </div>
        <div className="heroMark"><img src="/not-logo.png" alt="" /></div>
      </section>

      <section id="shop" className="shop">
        <div className="sectionHead">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Shop NoT</h2>
          </div>
          <input
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
          />
        </div>

        <div className="filters">
          {categories.map((item) => (
            <button key={item} className={category === item ? "filter active" : "filter"} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="grid">
          {visibleProducts.map((product) => (
            <article className="card" key={product.id}>
              <div className="productVisual">
                {product.tag && <span className="tag">{product.tag}</span>}
                <div className="visualLogo">NoT</div>
              </div>
              <div className="cardBody">
                <p className="category">{product.category}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="cardFoot">
                  <strong>{money(product.price)}</strong>
                  <button onClick={() => addToCart(product.id)}>Add to bag</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visibleProducts.length === 0 && <div className="empty">No products match your search.</div>}
      </section>

      <section id="about" className="about">
        <p className="eyebrow">ABOUT NoT</p>
        <h2>Designed around your time.</h2>
        <p>Stage 3 adds persistent cart state, a delivery checkout flow, order confirmation and a production-ready foundation for connecting live payments.</p>
      </section>

      <footer id="contact">
        <img src="/not-logo.png" alt="NoT" />
        <p>Need of Time · NoT Brands</p>
      </footer>

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawerHead">
              <h2>Your bag</h2>
              <button onClick={() => setCartOpen(false)}>Close</button>
            </div>
            {cartProducts.length === 0 ? (
              <div className="empty">Your bag is empty.</div>
            ) : (
              <>
                <div className="cartList">
                  {cartProducts.map((product, index) => (
                    <div className="cartItem" key={`${product.id}-${index}`}>
                      <div><strong>{product.name}</strong><small>{product.category}</small></div>
                      <div><strong>{money(product.price)}</strong><button onClick={() => removeFromCart(index)}>Remove</button></div>
                    </div>
                  ))}
                </div>
                <div className="checkout">
                  <div><span>Total</span><strong>{money(total)}</strong></div>
                  <Link className="primary full" href="/checkout" onClick={() => setCartOpen(false)}>Continue to checkout</Link>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
