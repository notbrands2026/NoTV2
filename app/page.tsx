export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#f7f5ef",
      color: "#111",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 32px",
        background: "#fff",
        borderBottom: "1px solid #e7e2d8",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <a href="/" aria-label="NoT — Need of Time" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/not-logo.png"
            alt="NoT — Need of Time"
            style={{
              width: 150,
              height: 64,
              objectFit: "contain",
              display: "block"
            }}
          />
        </a>
        <nav style={{ display: "flex", gap: 24, fontSize: 14 }}>
          <a href="#shop" style={{ color: "#111", textDecoration: "none" }}>Shop</a>
          <a href="#about" style={{ color: "#111", textDecoration: "none" }}>About</a>
          <a href="#contact" style={{ color: "#111", textDecoration: "none" }}>Contact</a>
        </nav>
      </header>

      <section style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "72px 24px 96px",
        textAlign: "center"
      }}>
        <img
          src="/not-logo.png"
          alt="Need of Time logo"
          style={{
            width: "min(420px, 80vw)",
            height: 260,
            objectFit: "contain",
            display: "block",
            margin: "0 auto 28px"
          }}
        />
        <h1 style={{ fontSize: "clamp(38px, 6vw, 68px)", margin: "0 0 16px", letterSpacing: "-0.04em" }}>
          NoT — Need of Time
        </h1>
        <p style={{ maxWidth: 620, margin: "0 auto 32px", fontSize: 18, lineHeight: 1.6, color: "#5f5a52" }}>
          Welcome to NoT Brands — products designed for your time, your style, and your everyday life.
        </p>
        <a
          href="#shop"
          style={{
            display: "inline-block",
            padding: "14px 24px",
            borderRadius: 999,
            background: "#111",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600
          }}
        >
          Explore the store
        </a>
      </section>

      <section id="shop" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: 32, marginBottom: 12 }}>Shop</h2>
        <p style={{ color: "#5f5a52" }}>Your ecommerce collection will appear here.</p>
      </section>
    </main>
  );
}
