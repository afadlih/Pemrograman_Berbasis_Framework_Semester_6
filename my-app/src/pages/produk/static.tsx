import TampilanProduk from "../../views/product";
import { ProductType } from "../../types/product.type";
import { retrieveProducts } from "../../utils/db/servicefirebase";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <h1>Halaman Produk SSG</h1>
      <p>Sumber data: <strong>export async function getStaticProps</strong></p>
      <TampilanProduk products={products} />
    </div>
  );
};

export default halamanProdukStatic;

export async function getStaticProps() {
  return {
    props: {
      products: (await retrieveProducts("products")) as ProductType[],
    },
    revalidate: 10,
  };
}