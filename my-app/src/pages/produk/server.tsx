import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import TampilanProduk from "../../views/product";
import { ProductType } from "../../types/product.type";
import { retrieveProducts } from "../../utils/db/servicefirebase";

const halamanProdukServer = ({
    products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <h1 className="font-bold text-3xl pl-4">Halaman Produk SSR</h1>
            <p className="pl-4">Sumber data: <strong>export const getServerSideProps</strong></p>
            <TampilanProduk products={products} />
        </div>
    );
};
export default halamanProdukServer;

export const getServerSideProps: GetServerSideProps<{
    products: ProductType[];
}> = async ({ res }) => {
        // Ensure response is always fresh to demonstrate true SSR behavior.
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

        try {
            const products = (await retrieveProducts("products")) as ProductType[];

    return {
            props: {
                products,
            },
    };
        } catch {
            return {
                props: {
                    products: [],
                },
            };
        }
};