"use client";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState } from "react";

// USING CONTEXT
import { useAppContext } from "../../context/app-context";

const AddToCart = ({ data }) => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  // CONTEXT OF CARTnUMBER
  const { cartNumber, setCartNumber } = useAppContext();

  // ADD CART PRODUCTS
  const cartAdder = () => {
    const productData = {
      method: "push",
      newCartProduct: data,
    };
    const backendUrl = `https://fileshop-server.iran.liara.run/api/cart-manager`;
    axios
      .post(backendUrl, productData, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "با موفقیت به سبد خرید افزوده شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCartNumber(cartNumber + 1);
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
        onClick={() => cartAdder()}
        className="flex items-center justify-center text-center bg-orange-500 hover:bg-orange-600 transition-all duration-200 p-3 md:p-2 rounded-md w-full text-white"
      >
        افزودن به سبد خرید
      </button>
    </div>
  );
};

export default AddToCart;
