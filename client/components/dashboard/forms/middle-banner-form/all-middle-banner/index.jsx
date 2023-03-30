"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "./Box";
import Image from "next/image";

const AllMiddleBanner = () => {
  const [banners, setBanners] = useState([]);
  const [middleBannerNumber, setMiddleBannerNumber] = useState(1);
  const [pageNumber, setPageNumber] = useState(2);
  const [btnNumbers, setBtnNumbers] = useState([1]);
  console.log(btnNumbers);
  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/middle-banners?pn=${pageNumber}`
      )
      .then((d) => {
        setBanners(d.data.GoalMiddleBanners);
        setMiddleBannerNumber(d.data.AllMiddleBannersNumber);
        setBtnNumbers(
          Array.from(Array(Math.ceil(d.data.AllMiddleBannersNumber / 2))).keys()
        );
      })
      .catch((err) => console.log(err));
  }, []);

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
          banners.map((banner, i) => <Box key={i} data={banner} />)
        )}
      </div>
      <div>{Math.ceil(middleBannerNumber / 2)}</div>
    </div>
  );
};

export default AllMiddleBanner;
