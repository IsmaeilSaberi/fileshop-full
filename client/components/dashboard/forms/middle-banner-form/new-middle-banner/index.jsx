"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const NewMiddleBanner = () => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  const imageUrlRef = useRef();
  const imageAltRef = useRef();
  const imageLinkRef = useRef();
  const imageSituationRef = useRef();

  const formKeyNotSuber = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const submitter = (e) => {
    e.preventDefault();
    const formData = {
      image: imageUrlRef.current.value,
      imageAlt: imageAltRef.current.value,
      situation: imageSituationRef.current.value,
      link: imageLinkRef.current.value,
      date: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const url = `https://fileshop-server.iran.liara.run/api/new-middle-banner`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        formData.situation == "true"
          ? toast.success("بنر با موفقیت ذخیره و منتشر شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success("بنر با موفقیت به صورت خاموش ذخیره شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      })
      .catch((err) => {
        let message = "خطایی در ذخیره و ایجاد بنر رخ داد.";
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
      <h2 className="text-orange-500 text-lg">بنر جدید</h2>
      <form
        onSubmit={submitter}
        onKeyDown={formKeyNotSuber}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <div>آدرس عکس</div>
          <input
            required={true}
            type="text"
            ref={imageUrlRef}
            className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>آلت عکس</div>
          <input
            type="text"
            required={true}
            ref={imageAltRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>لینک عکس</div>
          <input
            type="text"
            required={true}
            ref={imageLinkRef}
            className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>روشن یا خاموش</div>
          <select
            ref={imageSituationRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          >
            <option value="true">روشن</option>
            <option value="false">خاموش</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 p-2 w-full rounded-md text-white transition-all duration-200 hover:bg-orange-500"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default NewMiddleBanner;
