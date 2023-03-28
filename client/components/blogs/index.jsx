import Link from "next/link";

import BlogBox from "./blogbox";

const Blogs = () => {
  return (
    <section className="container mx-auto flex flex-col gap-8">
      <header className="m-4 flex justify-between items-center">
        <h2 className="text-orange-500 text-2xl border-orange-500 border-r-2 pr-2">
          جدیدترین مقالات
        </h2>
        <div className="flex gap-1 items-center">
          <Link
            className="bg-orange-500 px-4 border-2 py-2 rounded-lg transition-all duration-200 hover:bg-orange-600"
            href={`/`}
          >
            مشاهده ی همه
          </Link>
        </div>
      </header>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <BlogBox />
        <BlogBox />
        <BlogBox />
        <BlogBox />
      </div>
    </section>
  );
};

export default Blogs;
