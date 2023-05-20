"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// USING CONTEXT
import { useAppContext } from "../../context/app-context";

const PaymentResultComponent = ({ searchParams, cookie }) => {
  const router = useRouter();

  // CONTEXT OF CARTNUMBER
  const { cartNumber, setCartNumber } = useAppContext();

  toast.info("لطفا صبر کنید!", {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  useEffect(() => {
    if (searchParams.np_status !== "OK") {
      toast.error("پرداخت انجام نشد!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/cart");
    } else {
      const formData = {
        amount: Number(searchParams.amount),
        trans_id: searchParams.trans_id,
        products: cartProductsIds,
      };
      axios
        .post(
          `https://fileshop-server.iran.liara.run/api/payment-result-check`,
          formData,
          {
            headers: { auth_cookie: cookie },
          }
        )
        .then((d) => {
          const message =
            d.data && d.data.msg ? d.data.msg : "پرداخت انجام شد!";
          toast.success(message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCartNumber(0);
          router.push("/account/files");
        })
        .catch((err) => {
          const message =
            err.response && err.response.data && err.response.data.msg
              ? err.response.data.msg
              : "خطا در پرداخت!";
          toast.error(message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push("/cart");
        });
    }
  }, []);

  return <div>به امید موفقیت هر چه بیشتر</div>;
};

export default PaymentResultComponent;
