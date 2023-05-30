import BlogPageComp from "../../components/blog-page";

const BlogPage = async ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <>
        <title>وبلاگ فروشگاه فایل اسماعیل</title>
        <meta name="description" content="وبلاگ فروشگاه فایل اسماعیل" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="http://localhost:3000/blog" />
      </>
      <BlogPageComp url={searchParams} />
    </div>
  );
};

export default BlogPage;
