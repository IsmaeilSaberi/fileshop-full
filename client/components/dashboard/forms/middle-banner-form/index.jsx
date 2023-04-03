"use client";
import { useState, useEffect } from "react";
import AllMiddleBanner from "./all-middle-banner";
import NewMiddleBanner from "./new-middle-banner";
import MiddleBannerDetails from "./middle-banner-details";

const MiddleBannerAll = () => {
  const [middleBannerDetailCtrl, setMiddleBannerDetailCtrl] = useState("");
  const [randNumForBannerClick, setRandNumForBannerClick] = useState(1);
  const [details, setDetails] = useState(
    <AllMiddleBanner
      setRandNumForBannerClick={setRandNumForBannerClick}
      setMiddleBannerDetailCtrl={setMiddleBannerDetailCtrl}
    />
  );

  useEffect(() => {
    if (middleBannerDetailCtrl != "") {
      setDetails(
        <MiddleBannerDetails middleBannerId={middleBannerDetailCtrl} />
      );
    }
  }, [randNumForBannerClick]);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">بنرهای تبلیغاتی</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllMiddleBanner
                  setRandNumForBannerClick={setRandNumForBannerClick}
                  setMiddleBannerDetailCtrl={setMiddleBannerDetailCtrl}
                />
              )
            }
            className="px-3 py-1 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDetails(<NewMiddleBanner />)}
            className="px-3 py-1 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            بنر جدید
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default MiddleBannerAll;
