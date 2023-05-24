import Image from "next/image";
import BreadCrumb from "../../../components/bread-crumb";
import { AiOutlineEye } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { MdDateRange } from "react-icons/md";
import Link from "next/link";
import RelatedPosts from "../../../components/sliders/related-posts";
import MostViewedPosts from "../../../components/most-viewed-posts";
import SearchBlog from "../../../components/search-blog";
import CommentsManager from "../../../components/comments-management";

const getData = async (slug) => {
  const data = await fetch(
    `https://fileshop-server.iran.liara.run/api/get-post/${slug}`,
    { cache: "no-store" }
  );
  return data.json();
};

const getProductsData = async () => {
  const productsData = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-most-popular-products",
    { cache: "no-store" }
  );
  return productsData.json();
};

const SingleBlog = async ({ params }) => {
  const data = await getData(params.slug);
  const productsData = await getProductsData();
  const commentProps = { src_id: data._id, typeOfModel: "post" };
  return (
    <div className="container mx-auto flex justify-between items-start gap-2">
      {data.msg ? (
        <div>مقاله هنوز منتشر نشده است!</div>
      ) : (
        <>
          <main className="w-[75%]">
            <div className="flex flex-col gap-8">
              <BreadCrumb
                secondTitle={"وبلاگ"}
                secondLink={"/blog"}
                title={data.title}
              />
              <section className="flex justify-center items-center">
                <Image
                  className="rounded-xl"
                  alt={data.imageAlt}
                  title={data.imageAlt}
                  width={800}
                  height={400}
                  src={data.image}
                  priority={true}
                />
              </section>
              <section className="flex flex-col gap-6">
                <h1 className="text-blue-500 text-lg">{data.title}</h1>
                <div className="flex justify-start items-center gap-2 text-base sm:text-sm">
                  <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
                    <AiOutlineEye className="w-6 h-6" />
                    <span>تعداد بازدید : </span>
                    <span>{data.pageView}</span>
                  </div>
                  <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
                    <TfiCommentAlt className="w-6 h-6" />
                    <span>دیدگاهها : </span>
                    <span>{data.comments.length}</span>
                  </div>
                  <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
                    <MdDateRange className="w-6 h-6" />
                    <span>آخرین بروز رسانی : </span>
                    <span>{data.updatedAt}</span>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-6">
                <h2 className="text-xl">توضیحات کامل</h2>
                <p className="leading-9 text-justify">{data.longDesc}</p>
              </section>
              <section>
                <RelatedPosts
                  typeOfModel="post"
                  relatedModels={data.relatedPosts}
                  title={"مقالات مرتبط"}
                />
              </section>
              <CommentsManager commentProps={commentProps} />
            </div>
          </main>
          <aside className="w-80 max-w-80 p-1 rounded-md bg-zinc-50 flex flex-col gap-8">
            <SearchBlog />
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">توضیحات خلاصه</h3>
              <p className="text-base sm:text-sm text-justify leading-4">
                {data.shortDesc}
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">برچسب ها</h3>
              <div className="flex justify-start items-center gap-2 flex-wrap">
                {data.tags.length < 1 ? (
                  <div className="flex justify-center items-center p-2">
                    بدون برچسب
                  </div>
                ) : (
                  data.tags.map((ta, i) => (
                    <Link
                      key={i}
                      className=" p-2 flex justify-start items-center text-base sm:text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 rounded-md"
                      href={`/blog?keyword=${ta}`}
                    >
                      #{ta}
                    </Link>
                  ))
                )}
              </div>
            </div>
            <MostViewedPosts />
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">پرفروش ترین محصولات</h3>
              <ul className="flex flex-col gap-2">
                {productsData.length < 1 ? (
                  <div></div>
                ) : (
                  productsData.map((p, i) => (
                    <li key={i}>
                      <Link
                        className="border-r-2 p-2 transition-all duration-200 hover:text-indigo-600 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                        href={`/shop/${p.slug}`}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default SingleBlog;
