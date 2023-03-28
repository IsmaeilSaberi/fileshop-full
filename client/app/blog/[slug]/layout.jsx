import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSend } from "react-icons/bs";

const BlogLayout = ({ children }) => {
  return (
    <div className="container mx-auto flex justify-between items-start gap-2">
      <main className="w-[75%]">{children}</main>
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
          <p className="leading-8 text-base sm:text-sm text-justify leading-4">
            مقاومت به انسولین به مشکلی اشاره دارد که در آن، بدن نمی‌تواند به
            درستی به انسولین واکنش نشان دهد. انسولین هورمونی است که توسط
            سلول‌های بتای لانگرهانز جزیره لانگرهانز در پانکراس ترشح می‌شود و با
            کاهش سطح گلوکز خون، متابولیسم آن را تنظیم می‌کند.
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
          <h3 className="text-blue-500">پربازدیدترین مقالات</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                className="border-r-2 p-2 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                href={""}
              >
                مقاله تستی 1
              </Link>
            </li>
            <li>
              <Link
                className="border-r-2 p-2 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                href={""}
              >
                مقاله تستی 1
              </Link>
            </li>
            <li>
              <Link
                className="border-r-2 p-2 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                href={""}
              >
                مقاله تستی 1
              </Link>
            </li>
            <li>
              <Link
                className="border-r-2 p-2 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                href={""}
              >
                مقاله تستی 1
              </Link>
            </li>
          </ul>
        </div>
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
        <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
          <h3 className="text-blue-500">شرکت در خبرنامه</h3>
          <form className="border-zinc-700 border-2 p-2 rounded-md flex justify-between items-center">
            <input
              type="text"
              className="bg-transparent px-2 py-1 text-sm outline-none"
              placeholder="ایمیل خود را وارد کنید..."
            />
            <BsSend className="cursor-pointer w-6 h-6" />
          </form>
        </div>
      </aside>
    </div>
  );
};

export default BlogLayout;
