"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserDetails from "../user-details";
import Image from "next/image";
import Cookies from "js-cookie";

const FindUser = () => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  const emailRef = useRef();
  const [userData, setUserData] = useState(0);

  const submitter = (e) => {
    setUserData(2);
    if (e.key == "Enter") {
      e.preventDefault();
    }
    e.preventDefault();
    const formData = {
      email: emailRef.current.value,
    };
    const url = `https://fileshop-server.iran.liara.run/api/search-user`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        if (d.data.userData == 0) {
          toast.error("چنین کاربری وجود ندارد!", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setUserData(1);
        } else {
          toast.success("اطلاعات کاربر مورد نظر بارگذاری شد!", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setUserData(d.data.userData);
        }
      })
      .catch((err) => {
        let message = "خطایی در ذخیره و ایجاد مقاله رخ داد.";
        if (err.response.data.msg) {
          message = err.response.data.msg;
        }
        toast.error(message, {
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
    <div className="flex flex-col gap-6">
      <h2 className="text-orange-500 text-lg">پیدا کردن کاربر با ایمیل</h2>
      <form onSubmit={submitter} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div>ایمیل کاربر</div>
          <input
            required={true}
            type="email"
            ref={emailRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 p-2 w-full rounded-md text-white transition-all duration-200 hover:bg-orange-500"
        >
          جستجوی کاربر
        </button>
      </form>
      <div>
        <div>اطلاعات کاربر</div>
        <div>
          {userData == 0 ? (
            <div>ایمیل کاربر را جستجو کنید...</div>
          ) : userData == 1 ? (
            <div>کاربری با این مشخصات یافت نشد!</div>
          ) : userData == 2 ? (
            <div className="flex justify-center items-center p-12">
              <Image
                alt="loading"
                width={120}
                height={120}
                src={"/loading.svg"}
              />
            </div>
          ) : (
            <UserDetails userId={userData._id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FindUser;
