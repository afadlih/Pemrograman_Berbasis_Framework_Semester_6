import { useRouter } from "next/router";

const Category = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Category Page</h1>
      <ul>
        {Array.isArray(slug) ? (
          slug.map((param, index) => <li key={index}>{param}</li>)
        ) : (
          <li>{slug}</li>
        )}
      </ul>
    </div>
  );
};

export default Category;
