"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

import { FiRefreshCcw } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const CartPageComponent = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);
  const [priceSum, setPriceSum] = useState(0);

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          `https://fileshop-server.iran.liara.run/api/get-part-of-user-data/cart`,
          {
            headers: { auth_cookie: cookie },
          }
        )
        .then((d) => {
          setData(d.data);
          setNeedRefresh(0);
          if (d.data.length < 1) {
            setPriceSum(0);
          } else {
            let i = 0;
            for (let j = 0; j < d.data.length; j++) {
              i += Number(d.data[j].price);
            }
            setPriceSum(i);
          }
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
      goalCartProductId: id,
    };
    axios
      .post(
        `https://fileshop-server.iran.liara.run/api/cart-manager`,
        formData,
        {
          headers: { auth_cookie: cookie },
        }
      )
      .then((d) => {
        const message =
          d.data && d.data.msg ? d.data.msg : "محصول از سبد خرید حذف شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(1);
      })
      .catch((err) => {
        toast.error("خطا در حذف محصول!", {
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

  return (
    <div>
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
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-start">
              <h1 className="text-indigo-600 text-lg ">سبد خرید</h1>
              <div
                onClick={() => {
                  setNeedRefresh(1);
                  setData([-1]);
                }}
                className="flex justify-center items-center rounded cursor-pointer transition-all duration-200 text-white hover:bg-indigo-400 text-sm gap-1 w-28 h-10 bg-indigo-500"
              >
                <FiRefreshCcw />
                به روز رسانی
              </div>
            </div>
            <div className="flex justify-between items-start gap-2 ">
              <div className="w-full rounded-md bg-zinc-100 p-4">
                {data.length < 1 ? (
                  <div className="flex justify-center items-center p-8 w-full">
                    محصولی موجود نیست!
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-8">
                    {data.map((da, i) => (
                      <div
                        className="w-full flex flex-col gap-4 bg-zinc-200 text-sm rounded-md p-4"
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
                            <div className="absolute top-1 left-1 bg-indigo-500 text-white rounded-sm text-xs flex justify-center items-center w-20 h-6">
                              {da.typeOfProduct == "gr" ? (
                                <div>فایل گرافیکی</div>
                              ) : da.typeOfProduct == "app" ? (
                                <div>اپلیکیشن</div>
                              ) : (
                                <div>کتاب</div>
                              )}
                            </div>
                            <Link
                              className="absolute top-1 left-24 flex justify-center items-center w-20 h-6 bg-green-600 transition-all duration-200 hover:bg-green-700 rounded-sm text-white text-sx"
                              href={`/shop/${da.slug}`}
                              target="_blank"
                            >
                              لینک محصول
                            </Link>
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
              <div className="w-80 flex flex-col gap-6 min-w-80 rounded-md bg-zinc-100 p-4">
                <div className="flex justify-center items-center gap-1">
                  <div>مجموع قیمت :</div>
                  <div className="flex justify-center items-center gap-1">
                    <div>{priceChanger(priceSum)}</div> <div>تومان</div>
                  </div>
                </div>
                <button className="bg-green-500 text-white rounded w-full h-10 flex justify-center items-center hover:bg-green-600 transition-all duration-200">
                  پرداخت
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPageComponent;