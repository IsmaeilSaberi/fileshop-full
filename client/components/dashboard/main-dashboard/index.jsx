"use client";
import { useEffect, useState } from "react";
import DashboardCtrl from "../dashboard-ctrl";

import MiddleBannerMain from "../forms/middle-banner-form";
import SlidersMain from "../forms/sliders-form";
import PostMain from "../forms/posts-form";
import CategoryMain from "../forms/categoryForms";
import ProductMain from "../forms/products-form";

const MainDashboard = () => {
  const [contentChanger, setContentChanger] = useState("middleBanner");
  const [details, setDetails] = useState(<MiddleBannerMain />);
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
    }
  }, [contentChanger]);
  return (
    <div className="container mx-auto flex justify-between items-start gap-4">
      <div className="sticky top-8 right-0 bottom-8">
        <DashboardCtrl setContentChanger={setContentChanger} />
      </div>
      <div className="w-full">{details}</div>
    </div>
  );
};

export default MainDashboard;
