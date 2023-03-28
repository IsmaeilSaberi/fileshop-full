import Link from "next/link";
import { BsSend } from "react-icons/bs";

const ShopLayout = ({ children }) => {
  return (
    <div className="container mx-auto flex justify-between items-start gap-4">
      <main className="w-[75%]">{children}</main>
      <aside className="w-80 max-w-80 p-1 rounded-md bg-zinc-50 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <button className="flex items-center justify-center text-center bg-orange-400 hover:bg-orange-500 transition-all duration-200 p-2 rounded-md w-full text-white">
            افزودن به سبد خرید- 3,000,000 تومان
          </button>
          <button className="flex items-center justify-center text-center bg-green-400 hover:bg-green-500 transition-all duration-200 p-2 rounded-md w-full text-white">
            افزودن به علاقه مندی ها
          </button>
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
          <h3 className="text-blue-500">معرفی کوتاه</h3>
          <p className=" text-base sm:text-sm text-justify leading-6">
            مقاومت به انسولین به مشکلی اشاره دارد که در آن، بدن نمی‌تواند به
            درستی به انسولین واکنش نشان دهد. انسولین هورمونی است که توسط
            سلول‌های بتای لانگرهانز جزیره لانگرهانز در پانکراس ترشح می‌شود و با
            کاهش سطح گلوکز خون، متابولیسم آن را تنظیم می‌کند.
          </p>
        </div>
        <div className="rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
          <ul className="flex flex-col gap-2">
            <li className="flex justify-between items-center">
              <span>تعداد خرید</span>
              <span>12</span>
            </li>
            <li className="flex justify-between items-center">
              <span>تعداد بازدید</span>
              <span>50</span>
            </li>
            <li className="flex justify-between items-center">
              <span>تعداد دیدگاه</span>
              <span>40</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
          <h3 className="text-blue-500">برچسب ها</h3>
          <div className="flex justify-start items-center gap-2 flex-wrap">
            <Link
              className=" p-2 flex justify-start items-center text-base sm:text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 rounded-md"
              href={""}
            >
              سلامتی
            </Link>
            <Link
              className=" p-2 flex justify-start items-center text-base sm:text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 rounded-md"
              href={""}
            >
              سلامتی
            </Link>
            <Link
              className=" p-2 flex justify-start items-center text-base sm:text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 rounded-md"
              href={""}
            >
              سلامتی
            </Link>
            <Link
              className=" p-2 flex justify-start items-center text-base sm:text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 rounded-md"
              href={""}
            >
              سلامتی
            </Link>
            <Link
              className=" p-2 flex justify-start items-center text-base sm:text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 rounded-md"
              href={""}
            >
              سلامتی
            </Link>
          </div>
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

export default ShopLayout;
