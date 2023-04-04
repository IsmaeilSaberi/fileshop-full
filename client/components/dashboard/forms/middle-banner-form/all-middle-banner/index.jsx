"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "./Box";
import Image from "next/image";

const AllMiddleBanner = ({
  setMiddleBannerDetailCtrl,
  setRandNumForBannerClick,
}) => {
  const [banners, setBanners] = useState([-1]);
  const [btnNumbers, setBtnNumbers] = useState([-1]);
  const [pageNumber, setPageNumber] = useState(1);
  const [allMiddleBannerNumbers, setAllMiddleBannerNumbers] = useState(0);

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/middle-banners?pn=${pageNumber}`
      )
      .then((d) => {
        setBanners(d.data.GoalMiddleBanners);
        setBtnNumbers([
          ...Array(Math.ceil(d.data.AllMiddleBannersNumber / 10)).keys(),
        ]);
        setAllMiddleBannerNumbers(d.data.AllMiddleBannersNumber);
      })
      .catch((err) => console.log(err));
  }, [pageNumber]);

  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="flex justify-end items-center">
        <div className="w-20 h-10 rounded-md bg-indigo-500 flex justify-center items-center text-white">
          {allMiddleBannerNumbers} بنر
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {banners[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : banners.length < 1 ? (
          <div className="flex justify-center items-center w-full p-8">
            بنری موجود نیست!
          </div>
        ) : (
          banners.map((banner, i) => (
            <Box
              key={i}
              setRandNumForBannerClick={setRandNumForBannerClick}
              setMiddleBannerDetailCtrl={setMiddleBannerDetailCtrl}
              data={banner}
            />
          ))
        )}
      </div>
      <div className="flex justify-center items-center gap-2">
        {btnNumbers[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image alt="loading" width={40} height={40} src={"/loading.svg"} />
          </div>
        ) : (
          btnNumbers.map((n, i) => (
            <button
              className="rounded-full w-8 h-8 bg-indigo-500 text-white flex justify-center items-center transition-all duration-300 hover:bg-orange-500"
              onClick={() => {
                setPageNumber(n + 1);
                setBanners([]);
                goToTop();
              }}
              key={i}
            >
              {n + 1}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default AllMiddleBanner;
