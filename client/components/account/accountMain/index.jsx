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

const AccountMainComponent = ({ items }) => {
  const router = useRouter();

  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));
  const [auth_cookie2, setauth_cookie2] = useState(Cookies.get("auth_cookie"));

  useEffect(() => {
    if (auth_cookie != auth_cookie2) {
      router.push("/login");
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
      setDetails(<Payments />);
    } else {
      setDetails(<Info cookie={auth_cookie} />);
    }
  }, [items.slug[0]]);

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-start gap-2">
        <div className="w-72 bg-zinc-100 p-6 rounded-md sticky top-8 right-0 bottom-8">
          <nav className="flex justify-center items-center ">
            <ul className="flex flex-col gap-4 w-full">
              <li className="w-full">
                <Link
                  onClick={goToTop}
                  className={
                    items.slug[0] == "info"
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
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
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
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
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
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
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
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
                      ? "rounded-md text-white bg-indigo-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
                      : "rounded-md text-white bg-orange-500 transition-none duration-200 hover:bg-orange-600 hover:text-white flex justify-center items-center w-full h-12"
                  }
                  href={"/account/payments"}
                >
                  سفارش ها
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 bg-zinc-100 w-full rounded-md">{details}</div>
      </div>
    </div>
  );
};

export default AccountMainComponent;