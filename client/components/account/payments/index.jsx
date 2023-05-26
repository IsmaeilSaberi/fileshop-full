"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import { FiRefreshCcw } from "react-icons/fi";
import Slider2box from "../../sliders/mainSlider/slider2box";

const Payments = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          `https://fileshop-server.iran.liara.run/api/get-part-of-user-data/payments`,
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

  return (
    <div className="flex flex-col gap-8 relative pt-20">
      <h3 className="text-lg absolute top-1 right-1 ">سفارش های من</h3>
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
                {data.length} سفارش
              </div>
            </div>
            <div>
              {data.length < 1 ? (
                <div className="flex justify-center items-center p-8 w-full">
                  سفارشی موجود نیست!
                </div>
              ) : (
                <div className="w-full flex flex-col gap-8">
                  {data.map((da, i) => (
                    <div
                      className="w-full flex flex-col gap-2 bg-zinc-200 text-sm rounded-md p-4 border-2 border-indigo-400"
                      key={i}
                    >
                      <div className="flex justify-between items-start gap-4 w-full">
                        <div className="flex justify-center items-center w-18 h-8 rounded bg-zinc-300">
                          {priceChanger(da.amount)} تومان
                        </div>
                        <div className="flex justify-center items-center w-36 h-8 rounded bg-zinc-300">
                          تاریخ: {da.createdAt}
                        </div>
                        {da.payed == true ? (
                          <div className="flex justify-center items-center w-20 h-8 rounded text-white bg-green-600">
                            پرداخت شد!
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              window.location.assign(
                                `https://nextpay.org/nx/gateway/payment/${da.resnumber}`
                              );
                            }}
                            className="flex justify-center items-center w-72 h-8 cursor-pointer rounded text-white bg-rose-600"
                          >
                            در انتظار پرداخت(می خواهم الان پرداخت کنم)!
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center gap-2 flex-wrap">
                        {da.products.map((d, i) => (
                          <Slider2box itemData={d} key={i} />
                        ))}
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

export default Payments;
