"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

import { FiRefreshCcw } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";

// USING CONTEXT
import { useAppContext } from "../../../context/app-context";

const Favorites = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);

  // CONTEXT OF CARTNUMBER
  const { cartNumber, setCartNumber } = useAppContext();

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          `https://fileshop-server.iran.liara.run/api/get-part-of-user-data/favorites`,
          {
            headers: { auth_cookie: cookie },
          }
        )
        .then((d) => {
          setData(d.data);
        })
        .catch((err) => {
          toast.error("خطا در لود اطلاعات!", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      setNeedRefresh(0);
    }
  }, [cookie, needRefresh]);

  const featureSpliter = (val) => {
    return val.split(":");
  };

  //// MAKE PRICE NUMBER BEAUTIFUL
  function priceChanger(num) {
    // Convert the number to a string
    num = num.toString();
    // Split the string into an array of three-digit chunks
    let chunks = [];
    while (num.length > 0) {
      chunks.push(num.slice(-3));
      num = num.slice(0, -3);
    }
    // Reverse the order of the chunks and join them with commas
    return chunks.reverse().join(",");
  }

  const productRemover = (id) => {
    const formData = {
      method: "remove",
      goalFavProductId: id,
    };
    axios
      .post(
        `https://fileshop-server.iran.liara.run/api/favorite-product`,
        formData,
        {
          headers: { auth_cookie: cookie },
        }
      )
      .then((d) => {
        toast.success(d.data.msg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(0);
      })
      .catch((err) => {
        toast.error("خطا در لود اطلاعات!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setNeedRefresh(1);
  };

  // ADD CART PRODUCTS
  const cartAdder = (id) => {
    const productData = {
      method: "push",
      newCartProduct: id,
    };
    const backendUrl = `https://fileshop-server.iran.liara.run/api/cart-manager`;
    axios
      .post(backendUrl, productData, {
        headers: { auth_cookie: cookie },
      })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "با موفقیت به سبد خرید افزوده شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCartNumber(cartNumber + 1);
      })
      .catch((err) => {
        const errorMsg =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : "خطا";
        toast.error(errorMsg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex flex-col gap-8 relative pt-20">
      <>
        <title>علاقه مندی های من</title>
        <meta name="description" content="علاقه مندی های من" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="http://localhost:3000/account/favorites" />
      </>
      <h3 className="text-lg absolute top-1 right-1 ">علاقه مندی های من</h3>
      <div
        onClick={() => {
          setNeedRefresh(1);
          setData([-1]);
        }}
        className="absolute top-1 left-1 flex justify-center items-center rounded cursor-pointer transition-all duration-200 text-white hover:bg-indigo-400 text-sm gap-1 w-28 h-10 bg-indigo-500"
      >
        <FiRefreshCcw />
        به روز رسانی
      </div>
      <div>
        {data[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-end items-center w-full">
              <div className="flex justify-center items-center bg-orange-500 text-white w-28 h-10 rounded-md">
                {data.length} محصول
              </div>
            </div>
            <div>
              {data.length < 1 ? (
                <div className="flex justify-center items-center p-8 w-full">
                  محصولی موجود نیست!
                </div>
              ) : (
                <div className="w-full flex flex-col gap-8">
                  {data.map((da, i) => (
                    <div
                      className="w-full flex flex-col gap-4 bg-zinc-200 text-sm rounded-md p-4 border-2 border-indigo-400"
                      key={i}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex justify-center items-center">
                          <Image
                            className="p-2"
                            alt={"product_image"}
                            title={da.imageAlt}
                            width={288}
                            height={120}
                            src={da.image}
                          />
                        </div>
                        <div className="relative w-full flex flex-col gap-4">
                          <Link
                            className="absolute top-1 left-24 flex justify-center items-center w-20 h-6 bg-green-600 transition-all duration-200 hover:bg-green-700 rounded-sm text-white text-sx"
                            href={`/shop/${da.slug}`}
                            target="_blank"
                          >
                            لینک محصول
                          </Link>
                          <div className="absolute top-1 left-1 bg-indigo-500 text-white rounded-sm text-xs flex justify-center items-center w-20 h-6">
                            {da.typeOfProduct == "gr" ? (
                              <div>فایل گرافیکی</div>
                            ) : da.typeOfProduct == "app" ? (
                              <div>اپلیکیشن</div>
                            ) : (
                              <div>کتاب</div>
                            )}
                          </div>

                          <h3 className="text-base">{da.title}</h3>
                          <p>{da.shortDesc}</p>
                          <div className="flex justify-start items-center gap-4">
                            <dir>{da.buyNumber} فروش</dir>
                            <dir>{priceChanger(da.price)} تومان</dir>
                          </div>
                          <div className="w-[95%] h-[.1rem] bg-zinc-400 rounded-md"></div>
                          <div className="flex flex-col gap-2">
                            {da.features.length < 1 ? (
                              <div className="flex justify-center items-center w-full p-4">
                                بدون ویژگی
                              </div>
                            ) : (
                              da.features.map((fe, i) => (
                                <div
                                  key={i}
                                  className="flex justify-start items-center gap-6"
                                >
                                  <div className="flex items-center justify-center gap-1">
                                    {featureSpliter(fe)[0]}:
                                  </div>
                                  <div>{featureSpliter(fe)[1]}</div>
                                </div>
                              ))
                            )}
                          </div>
                          <div
                            onClick={() => cartAdder(da._id)}
                            className="absolute bottom-2 left-44 flex justify-center items-center cursor-pointer transition-all duration-200 text-white hover:bg-green-600 bg-green-500 w-32 h-8 rounded gap-2"
                          >
                            <HiShoppingBag className="w-6 h-6 p-1 mr-1 rounded-lg" />{" "}
                            افزودن به سبد
                          </div>
                          <div
                            onClick={() => productRemover(da._id)}
                            className="absolute flex justify-center items-center gap-1 rounded bottom-2 left-2 w-16 h-6 cursor-pointer bg-rose-600 text-white transition-all duration-200 hover:bg-rose-700"
                          >
                            حذف
                            <MdDeleteForever />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
