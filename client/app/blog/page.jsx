import BlogPageComp from "../../components/blog-page";

const BlogPage = async ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <section className="flex flex-col gap-8">
        <h1 className="text-center text-xl text-indigo-600">
          وبلاگ فروشگاه فایل اسماعیل صابری
        </h1>
        <BlogPageComp url={searchParams} />
      </section>
    </div>
  );
};

export default BlogPage;
