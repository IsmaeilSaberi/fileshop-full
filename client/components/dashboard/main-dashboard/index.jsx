"use client";
import { useEffect, useState } from "react";
import DashboardCtrl from "../dashboard-ctrl";

import MiddleBannerAll from "../forms/middle-banner-form";
import SlidersAll from "../forms/sliders-form";
import PostForms from "../forms/posts-form";

const MainDashboard = () => {
  const [contentChanger, setContentChanger] = useState("middleBanner");
  const [details, setDetails] = useState(<MiddleBannerAll />);
  useEffect(() => {
    if (contentChanger == "middleBanner") {
      setDetails(<MiddleBannerAll />);
    } else if (contentChanger == "sliders") {
      setDetails(<SlidersAll />);
    } else if (contentChanger == "posts") {
      setDetails(<PostForms />);
    }
  }, [contentChanger]);
  return (
    <div className="container mx-auto flex justify-between items-start gap-4">
      <DashboardCtrl setContentChanger={setContentChanger} />
      <div className="w-full">{details}</div>
    </div>
  );
};

export default MainDashboard;
