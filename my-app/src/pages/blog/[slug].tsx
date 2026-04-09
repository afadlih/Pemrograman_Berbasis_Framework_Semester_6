import { useRouter } from 'next/router';
const blogvalue = () => {
    // const Router = useRouter();
    // console.log(Router);
    const { query } = useRouter();
  return (
    <div>
         <h1> Nilai Slug</h1>
         <p>Nilai: {query.slug}</p> 
    </div>
  );
}

export default blogvalue;