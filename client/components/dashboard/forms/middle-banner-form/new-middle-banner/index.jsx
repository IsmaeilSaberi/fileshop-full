"use client";
import { useRef } from "react";
import axios from "axios";

const NewMiddleBanner = () => {
  const imageUrlRef = useRef();
  const imageAltRef = useRef();
  const imageLinkRef = useRef();
  const imageSituationRef = useRef();

  const submitter = (e) => {
    e.preventDefault();
    const formData = {
      image: imageUrlRef.current.value,
      imageAlt: imageAltRef.current.value,
      situation: imageSituationRef.current.value,
      link: imageLinkRef.current.value,
    };
    const url = `https://fileshop-server.iran.liara.run/api/new-middle-banner`;
    axios
      .post(url, formData)
      .then((d) => console.log("ok"))
      .catch((err) => console.log("error"));
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-orange-500 text-lg">بنر جدید</h2>
      <form onSubmit={submitter} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div>آدرس عکس</div>
          <input
            type="text"
            ref={imageUrlRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>آلت عکس</div>
          <input
            type="text"
            ref={imageAltRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>لینک عکس</div>
          <input
            type="text"
            ref={imageLinkRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
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
          className="bg-indigo-400 p-2 w-full rounded-md text-white transition-all duration-200 hover:bg-orange-500"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default NewMiddleBanner;