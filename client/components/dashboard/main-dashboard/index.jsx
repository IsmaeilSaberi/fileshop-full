"use client";
import { useEffect, useState } from "react";
import DashboardCtrl from "../dashboard-ctrl";

import MiddleBannerMain from "../forms/middle-banner-form";
import SlidersMain from "../forms/sliders-form";
import PostMain from "../forms/posts-form";
import CategoryMain from "../forms/category-form";
import ProductMain from "../forms/products-form";
import AdminPannel from "../forms/admin-pannel";
import UserMain from "../forms/users-form";
import PaymentsMain from "../forms/payments-form";
import CommentsMain from "../forms/comments-form";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const MainDashboard = () => {
  const [contentChanger, setContentChanger] = useState("admin-pannel");
  const [details, setDetails] = useState(<AdminPannel />);

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (contentChanger == "middleBanner") {
      setDetails(<MiddleBannerMain />);
    } else if (contentChanger == "sliders") {
      setDetails(<SlidersMain />);
    } else if (contentChanger == "posts") {
      setDetails(<PostMain />);
    } else if (contentChanger == "categories") {
      setDetails(<CategoryMain />);
    } else if (contentChanger == "products") {
      setDetails(<ProductMain />);
    } else if (contentChanger == "users") {
      setDetails(<UserMain />);
    } else if (contentChanger == "payments") {
      setDetails(<PaymentsMain />);
    } else if (contentChanger == "comments") {
      setDetails(<CommentsMain />);
    } else if (contentChanger == "admin-pannel") {
      setDetails(<AdminPannel />);
    }
    goToTop();
  }, [contentChanger]);

  //FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-start gap-2">
        <div
          className={
            menuIsOpen == -1
              ? "z-50 w-full md:w-72 bg-gray-600 md:bg-zinc-100 p-6 rounded-none md:rounded-md md:bg-transparent fixed md:sticky md:top-8 md:right-0 md:bottom-8 h-auto py-2 md:py-4 md:px-2 top-0 bottom-0 left-[100%] md:left-0 -right-[100%] transition-all duration-500"
              : "z-50 w-full md:w-72 backdrop-blur-3xl md:bg-zinc-100 p-6 rounded-none md:rounded-md md:bg-transparent h-[100vh] py-1 md:px-2 fixed top-0 bottom-0 right-0 left-0 md:absolute transition-all duration-500"
          }
        >
          <DashboardCtrl
            setContentChanger={setContentChanger}
            setMenuIsOpen={setMenuIsOpen}
          />
        </div>
        <div className="p-2 md:p-4 bg-zinc-100 w-full rounded-md mt-4 md:mt-0">
          {details}
        </div>
      </div>
      <div className="fixed z-50 flex md:hidden top-2 left-2">
        <MdOutlineDashboard
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == -1
              ? "w-9 h-9 text-black flex"
              : "w-9 h-9 text-black hidden"
          }
        />
        <AiOutlineClose
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == 1
              ? "w-10 h-10 text-black flex"
              : "w-10 h-10 text-black hidden"
          }
        />
      </div>
    </div>
  );
};

export default MainDashboard;
