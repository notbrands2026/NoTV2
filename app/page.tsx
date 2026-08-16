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
  imageUrl?: string | null;
  stock: number;
};

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem("not-cart") || "[]")); } catch {}
    fetch("/api/products", { cache: "no-store" }).then(r=>r.json()).then(d=>setProducts(d.products||[])).catch(()=>setProducts([]));
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
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map(p=>p.category)))], [products]);

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
                {product.imageUrl?<img className="productImage" src={product.imageUrl} alt={product.name}/>:<div className="visualLogo">NoT</div>}
              </div>
              <div className="cardBody">
                <p className="category">{product.category}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="cardFoot">
                  <strong>{money(product.price)}</strong>
                  <button disabled={product.stock===0} onClick={() => addToCart(product.id)}>{product.stock===0?"Out of stock":"Add to bag"}</button>
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
