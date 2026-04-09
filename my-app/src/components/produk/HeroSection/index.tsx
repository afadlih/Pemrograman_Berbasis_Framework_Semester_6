const HeroSection = () => {
  return (
    <section className="hero-section" style={{ background: "linear-gradient(135deg, #1a73e8, #0d47a1)", color: "#fff", padding: "60px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "12px" }}>Daftar Produk</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "24px", opacity: 0.9 }}>
        Temukan berbagai produk pilihan terbaik untuk kebutuhanmu.
      </p>
      <input
        type="text"
        placeholder="Cari produk..."
        style={{
          padding: "10px 20px",
          borderRadius: "24px",
          border: "none",
          width: "100%",
          maxWidth: "400px",
          fontSize: "1rem",
          outline: "none",
        }}
      />
    </section>
  );
};

export default HeroSection;
