import Image from "next/image";
import BreadCrumb from "../../../components/breadCrumb";
import { AiOutlineEye } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { MdDateRange } from "react-icons/md";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import RelatedPosts from "../../../components/sliders/related-posts";
import MostViewedPosts from "../../../components/most-viewed-posts";

const getData = async (slug) => {
  const data = await fetch(
    `https://fileshop-server.iran.liara.run/api/get-post/${slug}`,
    { cache: "no-store" }
  );
  return data.json();
};

const SingleBlog = async ({ params }) => {
  const data = await getData(params.slug);

  return (
    <div className="container mx-auto flex justify-between items-start gap-2">
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
              relatedPosts={data.relatedPosts}
              title={"محصولات مرتبط"}
            />
          </section>
          <section className="flex flex-col gap-6">
            <h2 className="text-xl">دیدگاهها</h2>
            <form className="bg-gray-100 rounded-md h-48">1</form>
          </section>
        </div>
      </main>
      <aside className="w-80 max-w-80 p-1 rounded-md bg-zinc-50 flex flex-col gap-8">
        <form className="border-zinc-700 border-2 p-2 rounded-md flex justify-between items-center">
          <input
            type="text"
            className="bg-transparent px-2 py-1 text-sm outline-none"
            placeholder="جستجو در وبلاگ ... "
          />
          <AiOutlineSearch className="cursor-pointer w-6 h-6" />
        </form>
        <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
          <h3 className="text-blue-500">توضیحات خلاصه</h3>
          <p className="text-base sm:text-sm text-justify leading-4">
            {data.shortDesc}
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
          <h3 className="text-blue-500">برچسب ها</h3>
          <div className="flex justify-start items-center gap-2 flex-wrap">
            {data.tags.map((ta, i) => (
              <Link
                key={i}
                className=" p-2 flex justify-start items-center text-base sm:text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 rounded-md"
                href={`/search/tags/${ta}`}
              >
                {ta}
              </Link>
            ))}
          </div>
        </div>
        <MostViewedPosts />
        <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
          <h3 className="text-blue-500">پرفروش ترین محصولات</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                className="border-r-2 p-2 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                href={""}
              >
                محصول تستی 1
              </Link>
            </li>
            <li>
              <Link
                className="border-r-2 p-2 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                href={""}
              >
                محصول تستی 1
              </Link>
            </li>
            <li>
              <Link
                className="border-r-2 p-2 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                href={""}
              >
                محصول تستی 1
              </Link>
            </li>
            <li>
              <Link
                className="border-r-2 p-2 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                href={""}
              >
                محصول تستی 1
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SingleBlog;
