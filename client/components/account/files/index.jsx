"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

import { FiRefreshCcw } from "react-icons/fi";

const Files = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          `https://fileshop-server.iran.liara.run/api/get-part-of-user-data/files`,
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

  return (
    <div className="flex flex-col gap-8 relative pt-20">
      <>
        <title>محصولات من</title>
        <meta name="description" content="محصولات من" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="http://localhost:3000/account/files" />
      </>
      <h3 className="text-lg absolute top-1 right-1 ">محصولات من</h3>
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
                {data.length} فایل
              </div>
            </div>
            <div>
              {data.length < 1 ? (
                <div className="flex justify-center items-center p-8 w-full">
                  فایلی موجود نیست!
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
                            alt={da.imageAlt}
                            title={da.imageAlt}
                            width={288}
                            height={120}
                            src={da.image}
                          />
                        </div>
                        <div className="relative w-full h-[140px] flex flex-col justify-between gap-4">
                          <Link
                            className="absolute top-1 left-24 flex justify-center items-center w-20 h-6 bg-green-600 transition-all duration-200 hover:bg-green-700 rounded-sm text-white text-sx"
                            href={`/shop/${da.slug}`}
                            target="_blank"
                          >
                            لینک محصول
                          </Link>
                          <h3 className="text-base">{da.title}</h3>
                          <Link
                            className="flex justify-center items-center py-3 px-4 bg-sky-600 transition-all duration-200 hover:bg-sky-700 rounded-md text-white text-sm"
                            href={da.mainFile}
                            target="_blank"
                          >
                            دانلود فایل محصول
                          </Link>
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

export default Files;
