"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";

const SliderDetails = ({ sliderId }) => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  // the part for prevent for submitting with enter key
  const formKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  const imageUrlRef = useRef();
  const imageAltRef = useRef();
  const imageLinkRef = useRef();
  const imageSituationRef = useRef();
  const sorterRef = useRef();

  // here we update a slider details
  const updater = (e) => {
    e.preventDefault();
    const formData = {
      id: sliderId,
      image: imageUrlRef.current.value,
      imageAlt: imageAltRef.current.value,
      situation: imageSituationRef.current.value,
      sorter: sorterRef.current.value,
      link: imageLinkRef.current.value,
      date: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    axios
      .post(
        `https://fileshop-server.iran.liara.run/api/update-slider/${sliderId}`,
        formData,
        {
          headers: { auth_cookie: auth_cookie },
        }
      )
      .then((d) => {
        formData.situation == "true"
          ? toast.success("اسلایدر با موفقیت آپدیت و منتشر شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success("اسلایدر با موفقیت آپدیت و به صورت خاموش ذخیره شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      })
      .catch((err) => {
        console.log("خطا!");
        let message = "خطایی در آپدیت و ذخیره اسلایدر رخ داد.";
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

  const [fullData, setFullData] = useState([-1]);

  // this part used for getting one slider details for using in details component
  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/get-slider/${sliderId}`,
        {
          headers: { auth_cookie: auth_cookie },
        }
      )
      .then((d) => {
        setFullData(d.data);
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
  }, [sliderId]);

  // this part is used to delete a slider
  const remover = (e) => {
    axios
      .post(
        `https://fileshop-server.iran.liara.run/api/remove-slider/${sliderId}`,
        { item: 1 },
        {
          headers: { auth_cookie: auth_cookie },
        }
      )
      .then((d) =>
        toast.success("اسلایدر با موفقیت حذف شد.", {
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
            <h2 className="text-orange-500 text-lg">جزئیات اسلایدر</h2>
            <button
              onClick={() => remover()}
              className="bg-rose-400 text-white px-3 py-1 rounded-md text-xs transition-all duration-200 hover:bg-rose-500"
            >
              حذف
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="bg-zinc-200 rounded px-3 py-1 text-sm">
              {fullData._id ? fullData._id : ""}
            </div>
            <div className="bg-zinc-200 rounded px-3 py-1 text-sm">
              {fullData.date ? fullData.date : ""}
            </div>
          </div>
          <form
            onSubmit={updater}
            onKeyDown={formKeyNotSuber}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <div>آدرس جدید عکس</div>
              <input
                defaultValue={fullData.image ? fullData.image : ""}
                required={true}
                type="text"
                ref={imageUrlRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>آلت جدید عکس</div>
              <input
                defaultValue={fullData.imageAlt ? fullData.imageAlt : ""}
                type="text"
                required={true}
                ref={imageAltRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>لینک جدید عکس</div>
              <input
                defaultValue={fullData.link ? fullData.link : ""}
                type="text"
                required={true}
                ref={imageLinkRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>سورتر جدید اسلایدر</div>
              <input
                defaultValue={fullData.sorter ? fullData.sorter : ""}
                type="number"
                required={true}
                ref={sorterRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>روشن یا خاموش</div>
              <select
                ref={imageSituationRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.situation == true ? (
                  <>
                    <option value="true">روشن</option>
                    <option value="false">خاموش</option>
                  </>
                ) : (
                  <>
                    <option value="false">خاموش</option>
                    <option value="true">روشن</option>
                  </>
                )}
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
      )}
    </div>
  );
};

export default SliderDetails;
