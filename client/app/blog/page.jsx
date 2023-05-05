import BlogPageComp from "../../components/blog-page";

const BlogPage = async ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <BlogPageComp url={searchParams} />
    </div>
  );
};

export default BlogPage;
