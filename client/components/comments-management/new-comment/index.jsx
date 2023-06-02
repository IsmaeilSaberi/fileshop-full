"use client";

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const NewComment = ({ commentProps, text, itemParentId }) => {
  const [auth_cookie, setAuth_cookie] = useState(Cookies.get("auth_cookie"));
  const router = useRouter();
  const messageRef = useRef();

  let theParentId = "nothing";
  useEffect(() => {
    if (itemParentId != undefined) {
      theParentId = itemParentId;
    }
  }, []);

  const formSubmitter = (e) => {
    e.preventDefault();
    if (auth_cookie == undefined || auth_cookie.length < 5) {
      Cookies.set("auth_cookie", "", { expires: 0 });
      router.push(`/login`);
    } else {
      const formData = {
        message: messageRef.current.value,
        src_id: commentProps.src_id,
        parentId: theParentId,
        typeOfModel: commentProps.typeOfModel,
      };
      const backendUrl = `https://fileshop-server.iran.liara.run/api/new-comment`;
      axios
        .post(backendUrl, formData, {
          headers: { auth_cookie },
        })
        .then((d) => {
          const message = d.data.msg
            ? d.data.msg
            : "دیدگاه شما پس از بررسی منتشر خواهد شد!";
          toast.success(message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          messageRef.current.value = "";
        })
        .catch((err) => {
          const errorMsg =
            err.response && err.response.data && err.response.data.msg
              ? err.response.data.msg
              : "خطا در ثبت دیدگاه!";
          toast.error(errorMsg, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const formKeyNotSuber = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={formSubmitter}
      onKeyDown={formKeyNotSuber}
      className="flex flex-col gap-6 bg-zinc-100 rounded-md p-2"
    >
      <textarea
        ref={messageRef}
        rows="10"
        placeholder="دیدگاهتان را اینجا بنویسید..."
        className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
      />
      <button
        type="submit"
        className="bg-blue-500 rounded-md p-2 text-white w-full transitioln-all duration-200 hover:bg-blue-600"
      >
        {text}
      </button>
    </form>
  );
};

export default NewComment;
