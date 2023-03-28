"use client";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowUp } from "react-icons/ai";
import { MdArrowLeft } from "react-icons/md";

const Footer = () => {
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="container mx-auto my-6 flex flex-col gap-8">
      <div className="flex justify-between items-center p-8 bg-zinc-200 rounded-md">
        <div className="w-72 max-w-72 flex flex-col gap-4">
          <div className="flex justify-center items-center">
            <Image alt="logo" width={100} height={100} src="/ismaeil1.png" />
          </div>
          <p className="text-center text-base sm:text-sm">
            توصیحاتی در مورد سایت و نحوه ی فعالیت های آن و هر چیز مهمی که دلت می
            خواهد در فوتر سایت بیاوری.
          </p>
        </div>
        <div className="flex justify-around items-start gap-16">
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
      <div className="flex justify-between items-center py-6">
        <p className="">
          تمامی حقوق مادی و معنوی این وبسایت متعلق به اسماعیل صابری می باشد.
          ismaeilsaberi.com
        </p>
        <AiOutlineArrowUp
          onClick={() => goToTop()}
          className="fixed left-4 bottom-4 w-12 h-12 p-2 cursor-pointer rounded-md bg-zinc-300 transition-all duration-200 hover:bg-zinc-500 hover:text-white"
        />
      </div>
    </footer>
  );
};

export default Footer;
