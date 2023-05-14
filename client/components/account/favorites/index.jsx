"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

import { FiRefreshCcw } from "react-icons/fi";

const Favorites = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);

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
          <div className="flex flex-col gap-8 relative pt-20">
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
            {data.length < 1 ? (
              <div className="flex justify-center items-center p-8 w-full">
                محصولی موجود نیست!
              </div>
            ) : (
              <div className="w-full flex flex-col gap-8">
                {data.map((da, i) => (
                  <div
                    className="w-full flex flex-col gap-4 bg-zinc-200 text-sm rounded-md p-1"
                    key={i}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div>{da.title}</div>
                      </div>
                      <Link href={`/shop/${da.slug}`} target="_blank">
                        <Image
                          className="p-2"
                          alt={"product_image"}
                          title={da.imageAlt}
                          width={288}
                          height={120}
                          src={da.image}
                        />
                      </Link>
                    </div>
                    {/* <div>{da.price}</div>
                    <div>{da.shortDesc}</div>
                    <div>{da.buyNumber}</div>
                    <div>{da.features}</div> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
    </div>
  );
};

export default Favorites;
