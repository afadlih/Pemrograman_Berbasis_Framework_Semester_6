import TampilanProduk from "../views/product";
import useSWR from "swr";
import fetcher from "../utils/swr/fetcher";

const kategori = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/produk", fetcher);
  const products = data?.data ?? [];

  const handleRefresh = async () => {
    await mutate();
  };

  return (
    <div>
      <div className="produk__toolbar">
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="produk__refreshButton"
        >
          {isLoading ? "Loading..." : "Refresh Data"}
        </button>
      </div>
      {error ? <p className="produk__error">Gagal memuat data produk.</p> : null}
      <TampilanProduk products={products} />
    </div>
  );
};

export default kategori;