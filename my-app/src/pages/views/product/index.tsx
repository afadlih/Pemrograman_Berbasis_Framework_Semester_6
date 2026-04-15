import Image from "next/image";
import styles from "../../produk/product.module.scss";

type ProductType = {
  id: string;
  name: string;
  price?: number;
  harga?: number;
  size?: string;
  ukuran?: string;
  category: string;
  image?: string;
  productLink?: string;
};

function getProductImage(product: ProductType) {
  return product.image ?? "";
}

function getProductLink(product: ProductType) {
  return product.productLink ?? "";
}

const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// cSpell:disable
const TampilanProduk = ({ products }: { products: ProductType[] }) => {
// cSpell:enable
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
              const displaySize = product.size ?? product.ukuran ?? "-";
              const imageSrc = getProductImage(product);
              const productLink = getProductLink(product);

              return (
                <div key={product.id} className={styles.produk__content__item}>
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      className={styles.produk__content__item__image}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div className={styles.produk__content__skeleton__image} />
                  )}
                  <h4 className={styles.produk__content__item__name}>
                    {product.name}
                  </h4>
                  <p className={styles.produk__content__item__category}>
                    kategori: {product.category}
                  </p>
                  {productLink ? (
                    <p className={styles.produk__content__item__category}>
                      <a href={productLink} target="_blank" rel="noreferrer">
                        Lihat Link Produk
                      </a>
                    </p>
                  ) : null}
                  <p className={styles.produk__content__item__category}>
                    ukuran: {displaySize}
                  </p>
                  <p className={styles.produk__content__item__price}>
                    Harga:{" "}
                    {displayPrice !== null
                      ? priceFormatter.format(displayPrice)
                      : "-"}
                  </p>
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
