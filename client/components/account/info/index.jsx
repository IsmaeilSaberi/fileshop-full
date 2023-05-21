"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { FiRefreshCcw } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

//FOR UPDATING MINI DATA
import { useForm } from "react-hook-form";

const Info = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);

  useEffect(() => {
    if (cookie && cookie.length > 0) {
      axios
        .get(
          `https://fileshop-server.iran.liara.run/api/get-part-of-user-data/info`,
          {
            headers: { auth_cookie: cookie },
          }
        )
        .then((d) => {
          setData(d.data);
          setBulkEmailSituation(d.data.emailSend);
        })
        .catch((err) => {
          toast.error("خطا در لود اطلاعات!", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      setNeedRefresh(0);
    }
  }, [cookie, needRefresh]);

  //FOR UPDATING MINI DATA
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  const miniUpdater = () => {
    const formData = {
      displayname: watch("displayname"),
      password: watch("password"),
      rePassword: watch("repassword"),
    };
    const backendUrl = `https://fileshop-server.iran.liara.run/api/update-mini-user/${data._id}`;
    axios
      .post(backendUrl, formData)
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "تغییر اطلاعات با موفقیت انجام شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(1);
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

  // CONFIRM EMAIL FOR ACTIVATE USER WITH CODE
  const ActiveCodeRef = useRef();
  const userEmailConfirmer = (e) => {
    e.preventDefault();
    const formData = {
      activateCode: ActiveCodeRef.current.value,
    };
    const backendUrl = `https://fileshop-server.iran.liara.run/api/confirm-user-email`;
    axios
      .post(backendUrl, formData, {
        headers: { auth_cookie: cookie },
      })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "تغییر اطلاعات با موفقیت انجام شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNeedRefresh(1);
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

  const [bulkEmailSituation, setBulkEmailSituation] = useState(true);
  const bulkEmailChanger = (input) => {
    const formData = {
      emailSend: input,
    };
    const backendUrl = `https://fileshop-server.iran.liara.run/api/update-email-user`;
    axios
      .post(backendUrl, formData, {
        headers: { auth_cookie: cookie },
      })
      .then((d) => {
        const message = d.data.msg
          ? d.data.msg
          : "تغییر اطلاعات با موفقیت انجام شد!";
        toast.success(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBulkEmailSituation(input);
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

  // LOGOUT
  const router = useRouter();
  const logouter = () => {
    Cookies.set("auth_cookie", "", { expires: 0 });
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-10 relative pt-8">
      <div
        onClick={() => {
          setNeedRefresh(1);
          setData([-1]);
        }}
        className="absolute top-1 left-1 flex justify-center items-center rounded cursor-pointer transition-all duration-200 text-white hover:bg-indigo-400 text-sm gap-1 w-28 h-10 bg-indigo-500"
      >
        <FiRefreshCcw />
        به روز رسانی
      </div>
      <div>
        {data[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data.userIsActive == false ? (
              <div className="flex flex-col gap-8 bg-zinc-200 w-full text-sm rounded-md p-8 my-8">
                <form
                  onSubmit={userEmailConfirmer}
                  className="flex flex-col  gap-8 items-center"
                >
                  <div>کد تایید حساب کاربری</div>
                  <input
                    ref={ActiveCodeRef}
                    type="text"
                    placeholder="لطفا کدی را که از طریق ایمیل برایتان ارسال شده را وارد کنید تا حساب کاربری فعال شود!"
                    autoComplete="off"
                    required={true}
                    className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 rounded-md p-2 text-white w-full transitioln-all duration-200 hover:bg-indigo-700"
                  >
                    فعال کردن حساب
                  </button>
                </form>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex justify-between items-center gap-6">
              <div className="flex justify-center gap-4 items-center bg-zinc-200 w-60 text-sm h-10 rounded-md p-1">
                <div>تاریخ ثبت نام:</div>
                <div>{data.createdAt}</div>
              </div>
              <div className="flex justify-center gap-4 items-center bg-zinc-200 w-60 text-sm h-10 rounded-md p-1">
                <div>تاریخ به روز رسانی:</div>
                <div>{data.updatedAt}</div>
              </div>
            </div>
            <div className="flex flex-col gap-8 bg-zinc-200 w-full text-sm rounded-md p-4">
              <div className="flex justify-start items-center gap-4">
                <div>نام کاربری:</div>
                <div>{data.username}</div>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div>نام نمایشی:</div>
                <div>{data.displayname}</div>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div>آدرس ایمیل:</div>
                <div>{data.email}</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-8 bg-zinc-200 w-full text-sm rounded-md p-4">
              <div>به روز رسانی اطلاعات</div>
              <form
                onSubmit={handleSubmit(miniUpdater)}
                className="flex flex-col gap-6 m-8 w-[30rem] bg-zinc-100 rounded-md p-6"
              >
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="نام نمایشی جدید"
                    className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
                    {...register("displayname", {
                      required: true,
                      maxLength: 20,
                      minLength: 8,
                    })}
                  />
                  {errors.displayname &&
                    errors.displayname.type == "required" && (
                      <div className="text-rose-500 text-sm">
                        نام نمایشی وارد نشده است!
                      </div>
                    )}
                  {errors.displayname &&
                    errors.displayname.type == "maxLength" && (
                      <div className="text-rose-500 text-sm">
                        نام نمایشی باید کمتر از 20 کاراکتر باشد!
                      </div>
                    )}
                  {errors.displayname &&
                    errors.displayname.type == "minLength" && (
                      <div className="text-rose-500 text-sm">
                        نام نمایشی باید بیشتر از 8 کاراکتر باشد!
                      </div>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="رمز عبور جدید"
                    className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
                    {...register("password", {
                      required: true,
                      maxLength: 20,
                      minLength: 8,
                    })}
                  />
                  {errors.password && errors.password.type == "required" && (
                    <div className="text-rose-500 text-sm">
                      رمز عبور وارد نشده است!
                    </div>
                  )}
                  {errors.password && errors.password.type == "maxLength" && (
                    <div className="text-rose-500 text-sm">
                      رمز عبور باید کمتر از 20 کاراکتر باشد!
                    </div>
                  )}
                  {errors.password && errors.password.type == "minLength" && (
                    <div className="text-rose-500 text-sm">
                      رمز عبور باید بیشتر از 8 کاراکتر باشد!
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="تکرار رمز عبور جدید"
                    className="p-2 w-full outline-none border-zinc-400 border-2 rounded-md focus:border-orange-400 "
                    {...register("repassword", {
                      required: true,
                      validate: (val) => val === watch("password"),
                    })}
                  />
                  {errors.repassword &&
                    errors.repassword.type == "required" && (
                      <div className="text-rose-500 text-sm">
                        رمز عبور وارد نشده است!
                      </div>
                    )}
                  {errors.repassword &&
                    errors.repassword.type == "validate" && (
                      <div className="text-rose-500 text-sm">
                        رمز عبور وارد شده مطابقت ندارد!
                      </div>
                    )}
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 rounded-md p-2 text-white w-full transitioln-all duration-200 hover:bg-indigo-700"
                >
                  به روز رسانی
                </button>
              </form>
            </div>
            <div className="flex justify-between items-center gap-8 bg-zinc-200 w-full text-sm rounded-md p-4">
              <div className="flex justify-center items-center rounded cursor-pointer transition-all duration-200 hover:bg-indigo-300 text-sm gap-1 w-60 h-10 bg-indigo-200">
                <div>اطلاع رسانی رویدادها</div>
                {bulkEmailSituation == true ? (
                  <button
                    onClick={() => {
                      bulkEmailChanger(false);
                    }}
                    className="flex justify-center items-center bg-rose-600 text-white w-20 h-6 rounded"
                  >
                    خاموش
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      bulkEmailChanger(true);
                    }}
                    className="flex justify-center items-center bg-green-600 text-white w-20 h-6 rounded"
                  >
                    روشن
                  </button>
                )}
              </div>
              <div>
                <div
                  onClick={logouter}
                  className="flex justify-center items-center rounded cursor-pointer transition-all duration-200 hover:bg-indigo-300 text-sm gap-1 w-60 h-10 bg-indigo-200"
                >
                  خروج از حساب کاربری
                  <BiLogOut className="w-8 h-8 text-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
