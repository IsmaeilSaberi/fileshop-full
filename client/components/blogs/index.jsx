import Link from "next/link";

import BlogBox from "./blogbox";

const getData = async () => {
  const data = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-new-posts"
  );
  return data.json();
};

const Blogs = async () => {
  const data = await getData();

  return (
    <>
      {data.length < 1 ? (
        <div></div>
      ) : (
        <section className="px-1 container mx-auto flex flex-col gap-8">
          <header className="m-4 flex justify-between items-center">
            <h2 className="text-orange-500 text-md md:text-xl border-orange-500 border-r-2 pr-2">
              جدیدترین مقالات
            </h2>
            <div className="flex gap-1 items-center">
              <Link
                className="bg-orange-500 px-4 border-2 py-2 rounded-lg transition-all duration-200 hover:bg-orange-600"
                href={`/blog`}
              >
                مشاهده ی همه
              </Link>
            </div>
          </header>
          <div className="flex flex-wrap justify-between items-center gap-2">
            {data.map((bl, i) => (
              <BlogBox key={i} data={bl} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Blogs;
