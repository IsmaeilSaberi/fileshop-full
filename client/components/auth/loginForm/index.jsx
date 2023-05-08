"use client";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  const formSubmitter = () => {
    const formData = {
      email: watch("email"),
      password: watch("password"),
    };
    const backendUrl = `https://fileshop-server.iran.liara.run/api/login-user`;
    axios
      .post(backendUrl, formData)
      .then((d) => {
        Cookies.set("auth", d.data.auth);
        const message = d.data.msg
          ? d.data.msg
          : "ورود شما به حساب کاربری با موفقیت انجام شد!";
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
    <section className="container mx-auto flex justify-center items-center">
      <form
        onSubmit={handleSubmit(formSubmitter)}
        className="flex flex-col gap-6 m-8 w-[30rem] bg-zinc-100 rounded-md p-8"
      >
        <div className="flex justify-center items-center gap-6 ">
          <h1 className="text-lg text-center text-blue-500 ">ورود به حساب</h1>
          <Link
            className="bg-blue-400 rounded-md text-white px-2 py-1 transition-all duration-200 hover:bg-blue-500"
            href={"/register"}
          >
            ثبت نام در سایت
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            autoComplete="off"
            placeholder="ایمیل"
            className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
            {...register("email", {
              required: true,
              minLength: 11,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && errors.email.type == "required" && (
            <div className="text-rose-500 text-sm">ایمیل را وارد کنید!</div>
          )}
          {errors.email && errors.email.type == "pattern" && (
            <div className="text-rose-500 text-sm">فرمت ایمیل صحیح نیست!</div>
          )}
          {errors.email && errors.email.type == "minLength" && (
            <div className="text-rose-500 text-sm">
              طول ایمیل حداقل باید 11 کاراکتر باشد!
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="password"
            autoComplete="off"
            placeholder="رمز عبور"
            className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
            {...register("password", {
              required: true,
              maxLength: 20,
              minLength: 6,
            })}
          />
          {errors.password && errors.password.type == "required" && (
            <div className="text-rose-500 text-sm">رمز عبور وارد نشده است!</div>
          )}
          {errors.password && errors.password.type == "maxLength" && (
            <div className="text-rose-500 text-sm">
              رمز عبور باید کمتر از 20 کاراکتر باشد!
            </div>
          )}
          {errors.password && errors.password.type == "minLength" && (
            <div className="text-rose-500 text-sm">
              رمز عبور باید بیشتر از 6 کاراکتر باشد!
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 rounded-md p-2 text-white w-full transitioln-all duration-200 hover:bg-blue-600"
        >
          ورود به حساب کاربری
        </button>
      </form>
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
    </section>
  );
};

export default LoginForm;
