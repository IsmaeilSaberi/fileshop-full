"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AiFillYoutube,
  AiFillInstagram,
  AiFillGoogleCircle,
  AiFillMail,
  AiFillPhone,
  AiOutlineSearch,
  AiFillShopping,
} from "react-icons/ai";
import {
  BsFillEnvelopeOpenFill,
  BsPersonBoundingBox,
  BsCalendar2HeartFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// USING CONTEXT
import { useAppContext } from "../../context/app-context";

const Header = () => {
  const [logoHover, setLogoHover] = useState(0);

  // CONTEXT OF CARTnUMBER
  const { cartNumber } = useAppContext();

  const router = useRouter();

  const searchRef = useRef();
  const shopSearcher = (e) => {
    e.preventDefault();
    if (searchRef.current.value.length > 0) {
      const url = `/shop?keyword=${searchRef.current.value.replace(
        /\s+/g,
        "_"
      )}`;
      router.push(url);
      searchRef.current.value = "";
    } else {
      toast.error("فرم جستجو خالی است.", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <header className="container mx-auto py-2">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col relative h-[14vw] w-48">
          <Link
            onMouseEnter={() => setLogoHover(1)}
            onMouseLeave={() => setLogoHover(0)}
            href={"/"}
            className="logo bg-white flex flex-col gap-2 p-4 z-30 rounded-lg shadow-[0px_1px_10px_rgba(0,0,0,0.25)] cursor-pointer transition-all duration-150 hover:shadow-[0px_1px_10px_rgba(0,0,0,0.5)] text-center"
          >
            <div className="flex justify-center items-center">
              <Image
                className="rounded-lg"
                width={100}
                height={100}
                src={"/ismaeil1.png"}
                alt="logo"
              />
            </div>
            <div>فروشگاه فایل اسماعیل</div>
          </Link>
          <div
            onMouseEnter={() => setLogoHover(1)}
            onMouseLeave={() => setLogoHover(0)}
            className={
              logoHover == 0
                ? "absolute bg-red-100 bottom-20 right-0 left-0 z-10 flex justify-around items-center text-[1.6rem] p-2 text-indigo-600 rounded-bl-lg rounded-br-lg transition-all duration-300"
                : "absolute bg-red-100 bottom-0 right-0 left-0 z-10 flex justify-around items-center text-[1.6rem] p-2 text-indigo-600 rounded-bl-lg rounded-br-lg transition-all duration-300"
            }
          >
            <Link
              target="_blank"
              className="transition-all duration-300 hover:text-orange-400"
              href={"/"}
            >
              <AiFillYoutube />
            </Link>
            <Link
              target="_blank"
              className="transition-all duration-300 hover:text-orange-400"
              href={"/"}
            >
              <AiFillInstagram />
            </Link>
            <Link
              target="_blank"
              className="transition-all duration-300 hover:text-orange-400"
              href={"/"}
            >
              <AiFillGoogleCircle />
            </Link>
            <Link
              target="_blank"
              className="transition-all duration-300 hover:text-orange-400"
              href={"/"}
            >
              <AiFillMail />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full h-[10vw] justify-between py-1">
          <div className="flex justify-between items-center w-full">
            <nav className="">
              <ul className="flex justify-start gap-2 items-center">
                <li>
                  <Link
                    className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-200 hover:bg-orange-400 hover:text-white"
                    href={"/"}
                  >
                    خانه
                  </Link>
                </li>
                <li>
                  <Link
                    className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-200 hover:bg-orange-400 hover:text-white"
                    href={
                      "/shop?&orderBy=date&maxP=100000000&minP=0&pgn=12&pn=1"
                    }
                  >
                    فروشگاه
                  </Link>
                </li>
                <li>
                  <Link
                    className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-200 hover:bg-orange-400 hover:text-white"
                    href={"/blog"}
                  >
                    وبلاگ
                  </Link>
                </li>
                <li>
                  <Link
                    className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-200 hover:bg-orange-400 hover:text-white"
                    href={"/dashboard"}
                  >
                    داشبورد
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex flex-col gap-2 items-end">
              <div className="flex gap-2 items-center">
                <div>09334478755</div>
                <AiFillPhone className="w-8 h-8 rounded-lg bg-slate-200 rotate-12 p-1" />
              </div>
              <div className="flex gap-2 items-center">
                <div>ismaeilsaberi@gmail.com</div>
                <BsFillEnvelopeOpenFill className="w-8 h-8 rounded-lg bg-slate-200 rotate-12 p-1" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <form
              onSubmit={shopSearcher}
              className="flex justify-start relative items-center w-full ml-1"
            >
              <input
                ref={searchRef}
                className="outline-none text-lg p-3 rounded-md  w-full shadow-[0px_0px_5px_rgba(0,0,0,0.15)] transition-all duration-200 focus:shadow-[0px_0px_10px_rgba(0,0,0,0.5)]"
                type="text"
                placeholder="جستجو بین محصولات"
              />
              <button
                // onClick={() => shopSearcher}
                className="w-12 absolute left-0"
                type="submit"
              >
                <AiOutlineSearch className="w-10 h-10" />
              </button>
            </form>
            <div className="flex gap-4 items-center w-[26rem] justify-end">
              <div className="flex justify-between items-center gap-2">
                <Link href={"/account/favorites"}>
                  <BsCalendar2HeartFill className="bg-zinc-400 text-white rounded hover:bg-indigo-500 transition-all duration-200 p-2 w-12 h-12 " />
                </Link>
                <Link href={"/account/info"}>
                  <BsPersonBoundingBox className="bg-zinc-400 text-white rounded hover:bg-indigo-500 transition-all duration-200 p-2 w-12 h-12 " />
                </Link>
              </div>

              <Link
                href={"/cart"}
                className="flex gap-2 justify-center items-center bg-orange-400 p-2 rounded-md"
              >
                <div className="text-green-800 flex items-center justify-center bg-white rounded-full w-8 h-8">
                  {cartNumber == -1 ? (
                    <div className="flex justify-center items-center p-1">
                      <Image
                        alt="loading"
                        width={15}
                        height={15}
                        src={"/loading.svg"}
                      />
                    </div>
                  ) : (
                    cartNumber
                  )}
                </div>
                <div className="text-white flex justify-center items-center">
                  سبد خرید
                </div>
                <div className="text-orange-500 bg-white rounded-lg flex justify-center items-center w-10 h-10">
                  <AiFillShopping className="w-6 h-6" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        bodyClassName={() => "font-[shabnam] text-sm flex items-center"}
        position="top-right"
        autoClose={3000}
        theme="colored"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </header>
  );
};

export default Header;
