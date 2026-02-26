import { useRouter } from 'next/router'

const BlogDetailPage = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <h1>Detail Blog</h1>
      <p>Slug: {slug}</p>
    </div>
  )
}

export default BlogDetailPage
