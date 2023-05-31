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

const Comments = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          `https://fileshop-server.iran.liara.run/api/get-part-of-user-data/comments`,
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
        <title>دیدگاههای من</title>
        <meta name="description" content="دیدگاههای من" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="http://localhost:3000/account/comments" />
      </>
      <h3 className="text-lg absolute top-1 right-1 ">دیدگاههای من</h3>
      <div
        onClick={() => {
          setNeedRefresh(1);
          setData([-1]);
        }}
        className="absolute top-1 left-0 flex justify-center items-center rounded cursor-pointer transition-all duration-200 text-white hover:bg-indigo-400 text-sm gap-1 w-28 h-10 bg-indigo-500"
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
                {data.length} دیدگاه
              </div>
            </div>
            <div>
              {data.length < 1 ? (
                <div className="flex justify-center items-center p-8 w-full">
                  دیدگاهی موجود نیست!
                </div>
              ) : (
                <div className="w-full flex flex-col gap-12">
                  {data.map((da, i) => (
                    <div
                      className="w-full flex flex-col gap-4 bg-zinc-200 text-sm rounded-md p-4 border-2 border-indigo-400"
                      key={i}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="relative w-full flex flex-col gap-8">
                          <div className="flex flex-wrap gap-4 justify-between items-center">
                            <Link
                              className="flex justify-center items-center p-1 bg-green-600 transition-all duration-200 hover:bg-green-700 rounded text-white text-sm"
                              href={
                                da.typeOfModel == "post"
                                  ? `/blog/${da.src.slug}`
                                  : `/shop/${da.src.slug}`
                              }
                              target="_blank"
                            >
                              {da.typeOfModel == "post" ? "مقاله" : "محصول"} :{" "}
                              {da.src.title}
                            </Link>
                            <div className="flex justify-end items-center gap-4">
                              <div className="bg-orange-500 text-white rounded-sm text-xs flex justify-center items-center w-28 h-6">
                                {da.createdAt}
                              </div>
                              <div className="">
                                {da.published == true ? (
                                  <div className="bg-green-600 text-white rounded w-28 h-6 text-base sm:text-sm flex justify-center items-center">
                                    منتشر شده
                                  </div>
                                ) : (
                                  <div className="bg-rose-600 text-white rounded w-28 h-6 text-base sm:text-sm flex justify-center items-center">
                                    در انتظار انتشار
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-base leading-9 text-black ">
                            {da.message}
                          </p>
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

export default Comments;
