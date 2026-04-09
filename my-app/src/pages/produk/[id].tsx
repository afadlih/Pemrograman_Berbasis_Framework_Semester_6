import { useRouter } from "next/router";
import Link from "next/link";

const HalamanProduk = () => {
  const { query } = useRouter();

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
      <Link
        href="/produk"
        style={{ color: "#1a73e8", textDecoration: "none", fontSize: "0.9rem" }}
      >
        &larr; Kembali ke Daftar Produk
      </Link>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: "20px 0 10px" }}>
        Detail Produk
      </h1>
      <p style={{ color: "#555", marginBottom: "24px" }}>
        ID Produk: <strong>{query.id}</strong>
      </p>

      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        }}
      >
        {/* <img
          src="https://via.placeholder.com/600x300"
          alt="Produk"
          style={{ width: "100%", borderRadius: "6px", marginBottom: "20px" }}
        /> */}
        <h2 style={{ fontWeight: "bold", marginBottom: "8px" }}>Nama Produk #{query.id}</h2>
        <p style={{ color: "#555", marginBottom: "12px" }}>
          Deskripsi lengkap untuk produk dengan ID {query.id}. Produk ini memiliki kualitas terbaik.
        </p>
        <p style={{ fontWeight: "bold", color: "#1a73e8", fontSize: "1.25rem" }}>Rp 150.000</p>
      </div>
    </div>
  );
};

export default HalamanProduk;