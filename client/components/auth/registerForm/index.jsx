"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  const formSubmitter = () => {
    const formData = {
      username: watch("username"),
      displayname: watch("displayname"),
      email: watch("email"),
      password: watch("password"),
      repassword: watch("repassword"),
    };
    console.log(formData);
  };

  return (
    <section className="container mx-auto flex justify-center items-center">
      <form
        onSubmit={handleSubmit(formSubmitter)}
        className="flex flex-col gap-6 m-8 w-[30rem] bg-zinc-100 rounded-md p-8"
      >
        <div className="flex justify-center items-center gap-6 ">
          <h1 className="text-lg text-center text-blue-500 ">
            ثبت نام در سایت
          </h1>
          <Link
            className="bg-blue-400 rounded-md text-white px-2 py-1 transition-all duration-200 hover:bg-blue-500"
            href={"/login"}
          >
            ورود به حساب
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            autoComplete="off"
            placeholder="نام کاربری"
            className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
            {...register("username", {
              required: true,
              maxLength: 20,
              minLength: 6,
            })}
          />
          {errors.username && errors.username.type == "required" && (
            <div className="text-rose-500 text-sm">
              نام کاربری وارد نشده است!
            </div>
          )}
          {errors.username && errors.username.type == "maxLength" && (
            <div className="text-rose-500 text-sm">
              نام کاربری باید کمتر از 20 کاراکتر باشد!
            </div>
          )}
          {errors.username && errors.username.type == "minLength" && (
            <div className="text-rose-500 text-sm">
              نام کاربری باید بیشتر از 6 کاراکتر باشد!
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            autoComplete="off"
            placeholder="نام نمایشی"
            className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
            {...register("displayname", {
              required: true,
              maxLength: 20,
              minLength: 6,
            })}
          />
          {errors.displayname && errors.displayname.type == "required" && (
            <div className="text-rose-500 text-sm">
              نام نمایشی وارد نشده است!
            </div>
          )}
          {errors.displayname && errors.displayname.type == "maxLength" && (
            <div className="text-rose-500 text-sm">
              نام نمایشی باید کمتر از 20 کاراکتر باشد!
            </div>
          )}
          {errors.displayname && errors.displayname.type == "minLength" && (
            <div className="text-rose-500 text-sm">
              نام نمایشی باید بیشتر از 6 کاراکتر باشد!
            </div>
          )}
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
        <div className="flex flex-col gap-1">
          <input
            type="password"
            autoComplete="off"
            placeholder="تکرار رمز عبور"
            className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
            {...register("repassword", {
              required: true,
              validate: (val) => val === watch("password"),
            })}
          />
          {errors.repassword && errors.repassword.type == "required" && (
            <div className="text-rose-500 text-sm">رمز عبور وارد نشده است!</div>
          )}
          {errors.repassword && errors.repassword.type == "validate" && (
            <div className="text-rose-500 text-sm">
              رمز عبور وارد شده مطابقت ندارد!
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 rounded-md p-2 text-white w-full transitioln-all duration-200 hover:bg-blue-600"
        >
          ثبت نام در سایت
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
