import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { retrieveDataByID } from "../../utils/db/servicefirebase";
import styles from "./product-detail.module.scss";

type ProductDetail = {
  id: string;
  name?: string;
  price?: number;
  harga?: number;
  size?: string;
  ukuran?: string;
  category?: string;
  image?: string;
  productLink?: string;
};

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const HalamanProduk = () => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const productId = router.query.id;

    if (!router.isReady || typeof productId !== "string") {
      return;
    }

    let isActive = true;

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = (await retrieveDataByID(
          "products",
          productId,
        )) as ProductDetail | null;

        if (isActive) {
          setProduct(result);
        }
      } catch {
        if (isActive) {
          setError("Gagal memuat detail produk.");
          setProduct(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadProduct();

    return () => {
      isActive = false;
    };
  }, [router.isReady, router.query.id]);

  if (!router.isReady || isLoading) {
    return (
      <div className={styles.detailPage}>
        <Link href="/produk" className={styles.backLink}>
          &larr; Kembali ke Daftar Produk
        </Link>
        <h1 className={styles.title}>Detail Produk</h1>
        <p className={styles.subtitle}>Memuat detail produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detailPage}>
        <Link href="/produk" className={styles.backLink}>
          &larr; Kembali ke Daftar Produk
        </Link>
        <h1 className={styles.title}>Detail Produk</h1>
        <p className={styles.subtitle}>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.detailPage}>
        <Link href="/produk" className={styles.backLink}>
          &larr; Kembali ke Daftar Produk
        </Link>
        <h1 className={styles.title}>Detail Produk</h1>
        <p className={styles.subtitle}>Produk tidak ditemukan.</p>
      </div>
    );
  }

  const displayPrice =
    typeof product.price === "number"
      ? product.price
      : typeof product.harga === "number"
        ? product.harga
        : null;

  const displaySize = product.size ?? product.ukuran ?? "-";

  return (
    <div className={styles.detailPage}>
      <Link href="/produk" className={styles.backLink}>
        &larr; Kembali ke Daftar Produk
      </Link>

      <h1 className={styles.title}>Detail Produk</h1>
      <p className={styles.subtitle}>
        ID Produk: <strong>{product.id}</strong>
      </p>

      <div className={styles.card}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name ?? "Produk"}
            width={600}
            height={400}
            className={styles.cardImage}
          />
        ) : null}
        <h2 className={styles.cardTitle}>{product.name ?? `Nama Produk #${product.id}`}</h2>
        <p className={styles.cardDescription}>
          Kategori: <strong>{product.category ?? "-"}</strong>
        </p>
        <p className={styles.cardDescription}>
          Ukuran: <strong>{displaySize}</strong>
        </p>
        <p className={styles.price}>
          {displayPrice !== null ? priceFormatter.format(displayPrice) : "-"}
        </p>
      </div>
    </div>
  );
};

export default HalamanProduk;