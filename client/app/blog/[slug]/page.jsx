import Image from "next/image";
import BreadCrumb from "../../../components/bread-crumb";
import { AiOutlineEye } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import Link from "next/link";
import RelatedPosts from "../../../components/sliders/related-posts";
import MostViewedPosts from "../../../components/most-viewed-posts";
import SearchBlog from "../../../components/search-blog";
import CommentsManager from "../../../components/comments-management";
import CommentsNumber from "../../../components/product-post-comments-number";
import { notFound } from "next/navigation";

const getData = async (slug) => {
  const data = await fetch(
    `https://fileshop-server.iran.liara.run/api/get-post/${slug}`,
    { cache: "no-store" }
  );
  const outData = await data.json();
  if (!outData._id && !outData.msg) {
    notFound();
  } else {
    return outData;
  }
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
        <div className="w-full flex justify-center items-center p-12 text-xl">
          <div>
            <>
              <title>{data.title}</title>
              <meta name="robots" content="index,follow" />
              <meta name="description" content="انتشار به زودی" />
              <link
                rel="canonical"
                href={`http://localhost:3000/blog/${data.slug}`}
              />
            </>
            مقاله هنوز منتشر نشده است!
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2 w-full my-8 px-1 md:p-0">
          <>
            <title>{data.title}</title>
            <meta name="robots" content="index,follow" />
            <meta name="description" content={data.shortDesc} />
            <link
              rel="canonical"
              href={`http://localhost:3000/blog/${data.slug}`}
            />
          </>
          <main className="w-full">
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
                <div className="flex justify-start items-center gap-2 text-base sm:text-sm flex-wrap">
                  <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
                    <AiOutlineEye className="w-6 h-6" />
                    <span>تعداد بازدید : </span>
                    <span>{data.pageView}</span>
                  </div>
                  <CommentsNumber goalId={data._id} />
                  <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
                    <MdDateRange className="w-6 h-6" />
                    <span>آخرین بروز رسانی : </span>
                    <span>{data.updatedAt}</span>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-6 p-2">
                <h2 className="text-xl">توضیحات کامل</h2>
                <p className="leading7 md:leading-9 text-justify">
                  {data.longDesc}
                </p>
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
          <aside className="mt-8 md:mt-0 w-full md:w-80 md:max-w-80 p-1 rounded-md bg-zinc-50 flex flex-col gap-8">
            <SearchBlog />
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">توضیحات خلاصه</h3>
              <p className="text-base sm:text-sm text-justify leading-6">
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
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
