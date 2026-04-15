import DetailProduk from "@/views/DetailProduct";
import { ProductType } from "@/types/product.type";
import { retrieveDataByID, retrieveProducts } from "@/utils/db/servicefirebase";

const HalamanProduk = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <DetailProduk product={product} />
    </div>
  );
};

export default HalamanProduk;

// fungsi server-side rendering (SSR)
// export async function getServerSideProps({params}: { params: { produk: string } }) {
//   const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
//   const response = await res.json();
//   return{
//     props:{
//       product: response.data,
//     },
//   };
// }

export async function getStaticPaths() {
  const products = (await retrieveProducts("products")) as ProductType[];
  const paths = products.map((product) => ({
    params: { produk: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { produk: string } }) {
  const product = (await retrieveDataByID(
    "products",
    params?.produk,
  )) as ProductType | null;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}