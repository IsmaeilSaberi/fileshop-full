"use client";
import Image from "next/image";
import Link from "next/link";
import { AiFillShopping, AiOutlineArrowUp } from "react-icons/ai";
import { MdArrowLeft } from "react-icons/md";

// USING CONTEXT
import { useAppContext } from "../../context/app-context";

const Footer = () => {
  // CONTEXT OF CARTnUMBER
  const { cartNumber } = useAppContext();

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="container mx-auto mt-8 flex flex-col gap-8">
      <div className="flex justify-between items-center p-2 gap-8 md:gap-2 bg-zinc-200 rounded-md flex-col md:flex-row">
        <div className="w-72 max-w-72 flex flex-col gap-4">
          <div className="flex justify-center items-center">
            <Image alt="logo" width={100} height={100} src="/ismaeil1.png" />
          </div>
          <p className="text-center text-base sm:text-sm">
            توصیحاتی در مورد سایت و نحوه ی فعالیت های آن و هر چیز مهمی که دلت می
            خواهد در فوتر سایت بیاوری.
          </p>
        </div>
        <div className="flex justify-around items-start gap-8 sm:gap-16">
          <div className="flex flex-col gap-2">
            <div className="text-xl">دسترسی سریع</div>
            <ul className="flex flex-col gap-2 text-base sm:text-sm">
              <li>
                <Link
                  className="flex gap-1 w-32 transition-all duration-300 hover:text-gray-700 hover:gap-2 items-center"
                  href={"/about"}
                >
                  <MdArrowLeft />
                  <span>درباره ما</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-1 w-32 transition-all duration-300 hover:text-gray-700 hover:gap-2 items-center"
                  href={"/contact"}
                >
                  <MdArrowLeft />
                  <span>تماس با ما</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-1 w-32 transition-all duration-300 hover:text-gray-700 hover:gap-2 items-center"
                  href={"/help"}
                >
                  <MdArrowLeft />
                  <span>حریم خصوصی</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-1 w-32 transition-all duration-300 hover:text-gray-700 hover:gap-2 items-center"
                  href={"/blog"}
                >
                  <MdArrowLeft />
                  <span>وبلاگ</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-1 w-32 transition-all duration-300 hover:text-gray-700 hover:gap-2 items-center"
                  href={"/about"}
                >
                  <MdArrowLeft />
                  <span className="text-xs">09334478755</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-1 w-32 transition-all duration-300 hover:text-gray-700 hover:gap-2 items-center"
                  href={"/about"}
                >
                  <MdArrowLeft />
                  <span className="text-xs">ismaeilsaberi@gmail.com</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl">راهنمای خرید</div>
            <ul className="flex flex-col gap-2 text-base sm:text-sm">
              <li>
                <Link
                  className="flex gap-1 w-32 transition-all duration-300 hover:text-gray-700 hover:gap-2 items-center"
                  href={"/help"}
                >
                  <MdArrowLeft />
                  <span>سوالات متداول</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-1 w-32 transition-all duration-300 hover:text-gray-700 hover:gap-2 items-center"
                  href={"/help"}
                >
                  <MdArrowLeft />
                  <span>چگونه خرید کنم؟</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-1 w-32 transition-all duration-300 hover:text-gray-700 hover:gap-2 items-center"
                  href={"/help"}
                >
                  <MdArrowLeft />
                  <span>قوانین سایت</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center gap-4">
            <Image
              alt="logo"
              width={120}
              height={120}
              src="/images/Licenses/1.png"
            />
            <Image
              alt="logo"
              width={120}
              height={120}
              src="/images/Licenses/2.png"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center py-1 mb-4">
        <p className="text-center w-full">
          تمامی حقوق مادی و معنوی این وبسایت متعلق به اسماعیل صابری می باشد.
          ismaeilsaberi.com
        </p>
        <AiOutlineArrowUp
          onClick={() => goToTop()}
          className="fixed left-4 bottom-4 w-12 h-12 p-2 cursor-pointer rounded-md bg-zinc-300 transition-all duration-200 hover:bg-zinc-500 hover:text-white"
        />
        <Link href={`/cart`} className="fixed right-4 bottom-4">
          <div className="relative">
            <div className="absolute z-40 -top-2 -right-2 p-1 rounded-full w-6 h-6 bg-indigo-500 flex justify-center items-center text-white">
              {cartNumber == -1 ? "" : cartNumber}
            </div>
            <AiFillShopping className="z-40 right-4 bottom-4 w-12 h-12 p-2 cursor-pointer rounded-md bg-zinc-300 text-orange-500 transition-all duration-200 hover:text-orange-600" />
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
