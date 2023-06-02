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
  AiOutlineSearch,
  AiFillShopping,
  AiOutlineClose,
} from "react-icons/ai";
import { BsPersonBoundingBox, BsCalendar2HeartFill } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { toast } from "react-toastify";

// USING CONTEXT
import { useAppContext } from "../../context/app-context";

const Header = () => {
  const [logoHover, setLogoHover] = useState(0);

  // CONTEXT OF CARTNUMBER
  const { cartNumber } = useAppContext();

  const router = useRouter();

  const searchRef = useRef();
  const shopSearcher = (e) => {
    e.preventDefault();
    setMenuIsOpen(-1);
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

  //FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);

  useEffect(() => {
    if (menuIsOpen == -1) {
      document.body.style.overflow = "auto";
    } else if (menuIsOpen == 1) {
      document.body.style.overflow = "hidden";
    }
  }, [menuIsOpen]);

  return (
    <header className="container mx-auto mt-2 h-[8vh] md:h-[28vh] relative z-50 ">
      <div
        className={
          menuIsOpen == -1
            ? "flex bg-gray-600 md:bg-transparent w-full h-[100vh] md:h-52 py-1 md:px-2 fixed top-0 bottom-0 -left-[100%] md:left-0 right-[100%] md:right-0 md:absolute transition-all duration-500"
            : "flex md:bg-transparent backdrop-blur-3xl w-full h-[100vh] md:h-52 py-1 md:px-2 fixed top-0 bottom-0 right-0 left-0 md:absolute transition-all duration-500"
        }
      >
        <div className="flex flex-col md:flex-row justify-start md:justify-between items-center md:items-start gap-2 w-full">
          <div className="flex flex-col relative h-20 mb-10 md:mb-0 md:h-44 w-48 md:w-52 items-center">
            <Link
              onMouseEnter={() => setLogoHover(1)}
              onMouseLeave={() => setLogoHover(0)}
              href={"/"}
              className="logo z-40 bg-white flex flex-col gap-2 p-4 rounded-lg shadow-[0px_1px_10px_rgba(0,0,0,0.25)] cursor-pointer transition-all duration-150 hover:shadow-[0px_1px_10px_rgba(0,0,0,0.5)]"
              onClick={() => setMenuIsOpen(-1)}
            >
              <div className="flex justify-center items-center">
                <Image
                  className="rounded-lg"
                  width={100}
                  height={50}
                  src={"/ismaeil1.png"}
                  alt="logo"
                />
              </div>
              <div className="text-sm xl:text-base">فروشگاه فایل اسماعیل</div>
            </Link>
            <div
              onMouseEnter={() => setLogoHover(1)}
              onMouseLeave={() => setLogoHover(0)}
              className={
                logoHover == 0
                  ? "hidden md:flex absolute bg-red-100 bottom-20 right-0 left-0 z-30 justify-around items-center text-[1.6rem] p-2 text-indigo-600 rounded-bl-lg rounded-br-lg transition-all duration-300"
                  : "hidden md:flex absolute bg-red-100 bottom-0 right-0 left-0 z-30 justify-around items-center text-[1.6rem] p-2 text-indigo-600 rounded-bl-lg rounded-br-lg transition-all duration-300"
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
          <div className="flex flex-col gap-4 w-full h-40">
            <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <nav className="">
                <ul className="flex flex-col md:flex-row justify-start gap-2 items-center">
                  <li>
                    <Link
                      className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-200 hover:bg-orange-400 hover:text-white"
                      href={"/"}
                      onClick={() => setMenuIsOpen(-1)}
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
                      onClick={() => setMenuIsOpen(-1)}
                    >
                      فروشگاه
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-200 hover:bg-orange-400 hover:text-white"
                      href={"/blog"}
                      onClick={() => setMenuIsOpen(-1)}
                    >
                      وبلاگ
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
              <form
                onSubmit={shopSearcher}
                className="flex justify-start relative items-center w-2/3 xl:w-full md:ml-1"
              >
                <input
                  ref={searchRef}
                  className="outline-none text-lg p-3 rounded-md  w-full shadow-[0px_0px_5px_rgba(0,0,0,0.15)] transition-all duration-200 focus:shadow-[0px_0px_10px_rgba(0,0,0,0.5)]"
                  type="text"
                  placeholder="جستجو بین محصولات"
                />
                <button
                  onClick={() => {
                    shopSearcher;
                  }}
                  className="w-12 absolute left-0"
                  type="submit"
                >
                  <AiOutlineSearch className="w-10 h-10" />
                </button>
              </form>
              <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-[26rem] justify-end">
                <div className="flex justify-between items-center gap-2">
                  <Link
                    href={"/account/favorites"}
                    onClick={() => setMenuIsOpen(-1)}
                  >
                    <BsCalendar2HeartFill className="bg-zinc-400 text-white rounded hover:bg-indigo-500 transition-all duration-200 p-2 w-12 h-12 " />
                  </Link>
                  <Link
                    href={"/account/info"}
                    onClick={() => setMenuIsOpen(-1)}
                  >
                    <BsPersonBoundingBox className="bg-zinc-400 text-white rounded hover:bg-indigo-500 transition-all duration-200 p-2 w-12 h-12 " />
                  </Link>
                </div>

                <Link
                  href={"/cart"}
                  onClick={() => setMenuIsOpen(-1)}
                  className="flex gap-2 justify-center items-center bg-orange-400  transition-all duration-300 hover:bg-orange-600 p-2 rounded-md"
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
      </div>
      <div className="fixed z-50 flex md:hidden top-2 right-2">
        <BiMenu
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == -1
              ? "w-10 h-10 text-black flex"
              : "w-10 h-10 text-black hidden"
          }
        />
        <AiOutlineClose
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == 1
              ? "w-10 h-10 text-black flex"
              : "w-10 h-10 text-black hidden"
          }
        />
      </div>
    </header>
  );
};

export default Header;
