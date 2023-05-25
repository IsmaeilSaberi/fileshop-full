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
  return (
    <div className="container mx-auto flex justify-between items-start gap-4">
      <div className="sticky top-0 right-0 bottom-0">
        <DashboardCtrl setContentChanger={setContentChanger} />
      </div>
      <div className="w-full">{details}</div>
    </div>
  );
};

export default MainDashboard;
