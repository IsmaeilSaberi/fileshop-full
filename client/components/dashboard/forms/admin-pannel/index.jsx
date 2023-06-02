"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminPannel = () => {
  const [newItemsData, setNewItemsData] = useState(-1);
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  useEffect(() => {
    axios
      .get(`https://fileshop-server.iran.liara.run/api/get-new-items`, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        toast.success("اطلاعات لود شد!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNewItemsData(d.data);
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
        setNewItemsData(0);
      });
  }, []);

  return (
    <div className="p-8 flex flex-col gap-8">
      <h2 className="text-xl p-4">پیشخوان مدیریتی وبسایت</h2>
      <div>
        {newItemsData == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : newItemsData == 0 ? (
          <div>خطا در لود اطلاعات!</div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>{newItemsData.newUsersNumber} کاربر جدید</div>
            <div>{newItemsData.newCommentsNumber} کامنت جدید</div>
            <div>{newItemsData.newPaymentsNumber} سفارش جدید</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPannel;
