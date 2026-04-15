import Image from "next/image";
import Link from "next/link";
import styles from "../../pages/produk/product.module.scss";
type ProductType = {
  id: string;
  name: string;
  price?: number;
  harga?: number;
  size?: string;
  ukuran?: string;
  category: string;
  image?: string;
};

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {products.length > 0 ? (
          <>
            {products.map((product: ProductType) => {
              const displayPrice =
                typeof product.price === "number"
                  ? product.price
                  : typeof product.harga === "number"
                    ? product.harga
                    : null;

              return (
                <div key={product.id} className={styles.produk__content__item}>
                  <Link href={`/produk/${product.id}`} className={styles.produk__content__itemLink}>
                    <Image
                      src={product.image ?? ""}
                      alt={product.name}
                      className={styles.produk__content__item__image}
                      width={200}
                      height={200}
                    />
                    <h4 className={styles.produk__content__item__name}>
                      nama : {product.name}
                    </h4>
                    <p className={styles.produk__content__item__category}>
                      kategori: {product.category}
                    </p>
                    <p className={styles.produk__content__item__price}>
                      Harga: {displayPrice !== null ? priceFormatter.format(displayPrice) : "-"}
                    </p>
                  </Link>
                </div>
              );
            })}
          </>
        ) : (
          <div className={styles.produk__content__skeleton}>
            <div className={styles.produk__content__skeleton__image}></div>
            <div className={styles.produk__content__skeleton__name}></div>
            <div className={styles.produk__content__skeleton__category}></div>
            <div className={styles.produk__content__skeleton__price}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;
