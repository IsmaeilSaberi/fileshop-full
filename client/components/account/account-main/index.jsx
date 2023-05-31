"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Info from "../info";
import Favorites from "../favorites";
import Comments from "../comments";
import Payments from "../payments";
import Files from "../files";
import axios from "axios";
import { ImProfile } from "react-icons/im";
import { AiOutlineClose } from "react-icons/ai";

const AccountMainComponent = ({ items }) => {
  const router = useRouter();

  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));
  const [auth_cookie2, setauth_cookie2] = useState(Cookies.get("auth_cookie"));

  // NO COOKIE REDIRECT
  useEffect(() => {
    if (auth_cookie != auth_cookie2) {
      router.push("/login");
    } else if (!auth_cookie || auth_cookie == "") {
      router.push("/login");
    } else {
      axios
        .get("https://fileshop-server.iran.liara.run/api/get-user-data", {
          headers: { auth_cookie: auth_cookie },
        })
        .then((d) => {
          if (!d.data._id) {
            router.push("/login");
          }
        })
        .catch((err) => {
          router.push("/login");
        });
    }
  }, [Cookies.get("auth_cookie")]);

  useEffect(() => {
    setauth_cookie2(Cookies.get("auth_cookie"));
  }, [Cookies.get("auth_cookie")]);

  //TAB
  const [details, setDetails] = useState(<Info cookie={auth_cookie} />);
  useEffect(() => {
    if (items.slug[0] == "info") {
      setDetails(<Info cookie={auth_cookie} />);
    } else if (items.slug[0] == "comments") {
      setDetails(<Comments cookie={auth_cookie} />);
    } else if (items.slug[0] == "files") {
      setDetails(<Files cookie={auth_cookie} />);
    } else if (items.slug[0] == "favorites") {
      setDetails(<Favorites cookie={auth_cookie} />);
    } else if (items.slug[0] == "payments") {
      setDetails(<Payments cookie={auth_cookie} />);
    } else {
      setDetails(<Info cookie={auth_cookie} />);
    }
  }, [items.slug[0]]);

  //FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-start gap-2">
        <div
          className={
            menuIsOpen == -1
              ? "z-50 w-full md:w-72 bg-gray-600 md:bg-zinc-100 p-6 rounded-none md:rounded-md md:bg-transparent fixed md:sticky md:top-8 md:right-0 md:bottom-8 h-[100vh] py-1 md:px-2 top-0 bottom-0 left-[100%] md:left-0 -right-[100%] transition-all duration-500"
              : "z-50 w-full md:w-72 bg-gray-600 md:bg-zinc-100 p-6 rounded-none md:rounded-md md:bg-transparent h-[100vh] py-1 md:px-2 fixed top-0 bottom-0 right-0 left-0 md:absolute transition-all duration-500"
          }
        >
          <nav className="flex justify-center items-center ">
            <ul className="flex flex-col gap-4 w-full">
              <li className="w-full">
                <Link
                  onClick={goToTop}
                  className={
                    items.slug[0] == "info"
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                  }
                  href={"/account/info"}
                >
                  اطلاعات
                </Link>
              </li>
              <li className="w-full">
                <Link
                  onClick={goToTop}
                  className={
                    items.slug[0] == "favorites"
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                  }
                  href={"/account/favorites"}
                >
                  علاقه مندی ها
                </Link>
              </li>
              <li className="w-full">
                <Link
                  onClick={goToTop}
                  className={
                    items.slug[0] == "files"
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                  }
                  href={"/account/files"}
                >
                  فایل ها
                </Link>
              </li>
              <li className="w-full">
                <Link
                  onClick={goToTop}
                  className={
                    items.slug[0] == "comments"
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                  }
                  href={"/account/comments"}
                >
                  دیدگاه ها
                </Link>
              </li>
              <li className="w-full">
                <Link
                  onClick={goToTop}
                  className={
                    items.slug[0] == "payments"
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-indigo-300 hover:text-white flex justify-center items-center w-full h-12"
                  }
                  href={"/account/payments"}
                >
                  سفارش ها
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 bg-zinc-100 w-full rounded-md mt-8 md:mt-0">
          {details}
        </div>
      </div>
      <div className="fixed z-50 flex md:hidden top-3 left-3">
        <ImProfile
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == -1
              ? "w-9 h-9 text-gray-800 flex"
              : "w-9 h-9 text-gray-800 hidden"
          }
        />
        <AiOutlineClose
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == 1
              ? "w-10 h-10 text-white flex"
              : "w-10 h-10 text-black hidden"
          }
        />
      </div>
    </div>
  );
};

export default AccountMainComponent;
