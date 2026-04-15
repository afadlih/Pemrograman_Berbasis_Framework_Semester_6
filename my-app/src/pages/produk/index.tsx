import TampilanProduk from "../../views/product";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import styles from "./product.module.scss";

const Kategori = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/produk", fetcher);
  const products = data?.data ?? [];

  const handleRefresh = async () => {
    await mutate();
  };

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Halaman Produk (CSR)</h1>
      <div className={styles.produk__toolbar}>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className={styles.produk__refreshButton}
        >
          {isLoading ? "Loading..." : "Refresh Data"}
        </button>
      </div>
      {error ? <p className={styles.produk__error}>Gagal memuat data produk.</p> : null}
      <TampilanProduk products={products} />
    </div>
  );
};

export default Kategori;