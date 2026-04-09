import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

const dummyProducts: Product[] = [
  { id: 1, name: "Produk A", price: 150000, description: "Deskripsi singkat produk A.", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Produk B", price: 250000, description: "Deskripsi singkat produk B.", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Produk C", price: 350000, description: "Deskripsi singkat produk C.", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Produk D", price: 450000, description: "Deskripsi singkat produk D.", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Produk E", price: 550000, description: "Deskripsi singkat produk E.", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Produk F", price: 650000, description: "Deskripsi singkat produk F.", image: "https://via.placeholder.com/150" },
];

const MainSection = () => {
  return (
    <section style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "24px" }}>Semua Produk</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              transition: "transform 0.2s",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />
            <div style={{ padding: "16px" }}>
              <h3 style={{ fontWeight: "bold", marginBottom: "6px" }}>{product.name}</h3>
              <p style={{ fontSize: "0.875rem", color: "#555", marginBottom: "10px" }}>{product.description}</p>
              <p style={{ fontWeight: "bold", color: "#1a73e8", marginBottom: "12px" }}>
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <Link
                href={`/produk/${product.id}`}
                style={{
                  display: "inline-block",
                  backgroundColor: "#1a73e8",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainSection;
