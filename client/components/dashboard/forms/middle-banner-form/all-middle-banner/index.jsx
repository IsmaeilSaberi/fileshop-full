"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "./Box";
import Image from "next/image";

const AllMiddleBanner = ({ setMiddleBannerDetailCtrl }) => {
  const [banners, setBanners] = useState([]);
  const [btnNumbers, setBtnNumbers] = useState([-1]);
  const [pageNumber, setPageNumber] = useState(1);

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
          ...Array(Math.ceil(d.data.AllMiddleBannersNumber / 2)).keys(),
        ]);
      })
      .catch((err) => console.log(err));
  }, [pageNumber]);

  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        {banners.length < 1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : (
          banners.map((banner, i) => (
            <Box
              key={i}
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
              className="rounded-full w-8 h-8 bg-indigo-500 text-white flex justify-center items-center"
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
