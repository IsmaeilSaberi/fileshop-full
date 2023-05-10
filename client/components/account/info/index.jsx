"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Info = ({ cookie }) => {
  const [data, setData] = useState([-1]);
  const [needRefresh, setNeedRefresh] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/get-part-of-user-data/info`,
        {
          headers: { auth_cookie: cookie },
        }
      )
      .then((d) => {
        console.log(d.data);
        setData(d.data);
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
  }, [needRefresh]);

  return (
    <div>
      <div>info</div>
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
    </div>
  );
};

export default Info;
