import TampilanProduk from "../../views/product";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import styles from "./product.module.scss";

const kategori = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/produk", fetcher);
  const products = data?.data ?? [];

  const handleRefresh = async () => {
    await mutate();
  };

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Halaman Produk (CSR)</h1>

      <section className={styles.produk__implInfo}>
        <h2 className={styles.produk__implInfoTitle}>Implementasi Rendering</h2>
        <div className={styles.produk__implInfoGrid}>
          <div className={styles.produk__implCard}>
            <p className={styles.produk__implBadge}>CSR</p>
            <p>Data diambil di browser memakai SWR.</p>
            <p className={styles.produk__implCode}>const &#123; data &#125; = useSWR("/api/produk", fetcher)</p>
            <Link href="/produk" className={styles.produk__implLink}>Buka halaman CSR</Link>
          </div>

          <div className={styles.produk__implCard}>
            <p className={styles.produk__implBadge}>SSR</p>
            <p>Data diambil setiap request di server.</p>
            <p className={styles.produk__implCode}>export const getServerSideProps = async () =&gt; ...</p>
            <Link href="/produk/server" className={styles.produk__implLink}>Buka halaman SSR</Link>
          </div>

          <div className={styles.produk__implCard}>
            <p className={styles.produk__implBadge}>SSG</p>
            <p>Data diambil saat build (static generation).</p>
            <p className={styles.produk__implCode}>export async function getStaticProps() &#123; ... &#125;</p>
            <Link href="/produk/static" className={styles.produk__implLink}>Buka halaman SSG</Link>
          </div>
        </div>
      </section>

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

export default kategori;