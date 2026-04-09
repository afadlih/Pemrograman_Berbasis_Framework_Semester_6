import { useRouter } from "next/router";

const halamanToko = () => {
  const router = useRouter();
  //   console.log(router);

  const { query } = useRouter();

  return (
    <div>
      <h1>Halaman Toko</h1>
      <p>
        Toko:
        {`${query.slug && query.slug[0] + "-" + query.slug[1]}`}
        {/* {Array.isArray(query.slug) ? query.slug.join("-") : query.slug} */}
      </p>
      <p>
        Kategori: {query.slug ? query.slug[0] : "Semua Kategori"}
      </p>
    </div>
  );
};

export default halamanToko;
