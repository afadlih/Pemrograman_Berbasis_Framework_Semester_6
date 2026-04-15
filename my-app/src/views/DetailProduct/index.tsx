import Image from "next/image";
import Link from "next/link";
import { ProductType } from "../../types/product.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const priceFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const DetailProduk = ({ product }: { product: ProductType }) => {
    const displayPrice =
        typeof product.price === "number"
            ? product.price
            : typeof product.harga === "number"
                ? product.harga
                : null;

    const displaySize = product.size ?? product.ukuran ?? "-";

    return (
        <>
            <Link href="/produk" className={styles.backLink}>
                &larr; Kembali ke Daftar Produk
            </Link>
            <h1 className={styles.title}>Detail Produk</h1>
            <p className={styles.subtitle}>
                ID Produk: <strong>{product.id}</strong>
            </p>
            <div className={styles.produkdetail}>
                <div className={styles.produkdetail__image}>
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={600}
                            height={400}
                            className={styles.produkdetail__img}
                        />
                    ) : null}
                </div>

                <div className={styles.produkdetail__info}>
                    <h1 className={styles.produkdetail__name}>{product.name}</h1>
                    <p className={styles.produkdetail__category}>Kategori: {product.category}</p>
                    <p className={styles.produkdetail__category}>Ukuran: {displaySize}</p>
                    <p className={styles.produkdetail__price}>
                        {displayPrice !== null ? priceFormatter.format(displayPrice) : "-"}
                    </p>
                </div>
            </div>
        </>
    );
};

export default DetailProduk;