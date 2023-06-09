"use client";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState } from "react";

const SingleProductFavPro = ({ data, cookie }) => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  // USER FAV PRODUCTS
  const favAdder = () => {
    const productData = {
      method: "push",
      newFavProduct: data,
    };
    const backendUrl = `https://fileshop-server.iran.liara.run/api/favorite-product`;
    axios
      .post(backendUrl, productData, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "با موفقیت به علاقه مندی ها افزوده شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
    <div>
      <button
        onClick={favAdder}
        className="flex items-center justify-center text-center bg-green-400 hover:bg-green-500 transition-all duration-200 p-2 rounded-md w-full text-white"
      >
        افزودن به علاقه مندی ها
      </button>
    </div>
  );
};

export default SingleProductFavPro;
