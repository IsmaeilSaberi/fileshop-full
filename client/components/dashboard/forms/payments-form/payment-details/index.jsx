"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import Cookies from "js-cookie";

const PaymentDetails = ({ paymentId }) => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  // the part for prevent for submitting with enter key
  const formKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  /// go to top or scroll up smoothly function
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewedRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const amountRef = useRef();
  const payedRef = useRef();

  // this part used for getting one payment details for using in default values
  const [fullData, setFullData] = useState([-1]);
  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/get-payment/${paymentId}`,
        {
          headers: { auth_cookie: auth_cookie },
        }
      )
      .then((d) => {
        setFullData(d.data);
        goToTop();
      })
      .catch((err) =>
        toast.error("خطا در لود اطلاعات!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  }, [paymentId]);

  // here we update a payment details
  const updater = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
    e.preventDefault();
    // CART, COMMENTS, PAYMENTS AND FILES SHOULD BE ADDED
    const formData = {
      updatedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      email: emailRef.current.value,
      viewed: viewedRef.current.value,
      username: usernameRef.current.value,
      amount: amountRef.current.value,
      resnumber: fullData.resnumber,
      payed: payedRef.current.value,
      products: fullData.products,
    };
    const url = `https://fileshop-server.iran.liara.run/api/update-payment/${paymentId}`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        toast.success("سفارش با موفقیت آپدیت شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        let message = "خطایی در آپدیت و ذخیره کاربر رخ داد.";
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

  // this part is used to delete a payment
  const remover = (e) => {
    const url = `https://fileshop-server.iran.liara.run/api/remove-payment/${paymentId}`;
    axios
      .post(
        url,
        { item: 1 },
        {
          headers: { auth_cookie: auth_cookie },
        }
      )
      .then((d) =>
        toast.success("سفارش با موفقیت حذف شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((err) =>
        toast.error("حذف موفقیت آمیز نبود!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  return (
    <div className="flex flex-col gap-6">
      {fullData[0] == -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-orange-500 text-lg">جزئیات سفارش</h2>
            <div className="flex justify-end items-center gap-2">
              <button
                onClick={() => remover()}
                className="bg-rose-500 text-white px-3 py-1 rounded-md text-xs transition-all duration-200 hover:bg-rose-600"
              >
                حذف
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
            <div className="bg-zinc-200 rounded p-2 text-sm flex flex-col justify-center items-center gap-2">
              <div> کد پرداختی :</div>
              <div>{fullData.resnumber ? fullData.resnumber : ""}</div>
            </div>
            <div className="bg-zinc-200 rounded px-3 py-1 text-sm flex justify-center items-center gap-2">
              <div> تاریخ ایجاد سفارش :</div>
              <div>{fullData.createdAt ? fullData.createdAt : ""}</div>
            </div>
            <div className="bg-zinc-200 rounded px-3 py-1 text-sm flex justify-center items-center gap-2">
              <div> به روز رسانی :</div>
              <div>{fullData.updatedAt ? fullData.updatedAt : ""}</div>
            </div>
          </div>
          <form
            onKeyDown={formKeyNotSuber}
            onSubmit={updater}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <div>دیده شده</div>
              <select
                ref={viewedRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.viewed && fullData.viewed == true ? (
                  <>
                    <option value="true">دیده شده</option>
                    <option value="false">دیده نشده</option>
                  </>
                ) : (
                  <>
                    <option value="false">دیده نشده</option>
                    <option value="true">دیده شده</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div> نام کاربری</div>
              <input
                defaultValue={fullData.username ? fullData.username : ""}
                required={true}
                type="text"
                ref={usernameRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>ایمیل کاربر</div>
              <input
                defaultValue={fullData.email ? fullData.email : ""}
                required={true}
                type="text"
                ref={emailRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>مقدار (تومان)</div>
              <input
                defaultValue={fullData.amount ? fullData.amount : ""}
                required={true}
                type="text"
                ref={amountRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>محصولات </div>
              {fullData.products.length < 1 ? (
                <div>بدون محصول !</div>
              ) : (
                <div className="flex justify-start items-center gap-4 text-xs flex-wrap">
                  {fullData.products.map((da, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-4 bg-zinc-200 rounded-md p-4"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div>آیدی :</div>
                        <div>{da._id}</div>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <div>عنوان :</div>
                        <div>{da.title}</div>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href={`/shop/${da.slug}`}
                          target={"_blank"}
                          className="flex justify-center items-center rounded w-12 h-6 text-xs text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                        >
                          لینک
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>پرداخت شده یا نه</div>
              <select
                ref={payedRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.payed && fullData.payed == true ? (
                  <>
                    <option value="true">پرداخت شده</option>
                    <option value="false">پرداخت نشده</option>
                  </>
                ) : (
                  <>
                    <option value="false">پرداخت نشده</option>
                    <option value="true">پرداخت شده</option>
                  </>
                )}
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 p-2 w-full rounded-md text-white transition-all duration-200 hover:bg-orange-500"
            >
              بروز رسانی
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
