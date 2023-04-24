"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider2box from "../sliders/mainSlider/slider2box";
import GraphicSliderBox from "../sliders/graphic-slider/graphicSliderBox";

const ShopComponent = ({ url }) => {
  const [searchResult, setSearchResult] = useState([-1]);
  const [btns, setBtns] = useState(1);

  const keyword = url.keyword ? url.keyword : "";

  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/search-products?keyword=${keyword}`
      )
      .then((d) => {
        setSearchResult(d.data.allProducts), setBtns(d.data.btns);
      })
      .catch((err) => console.log(err));
  }, [url]);
  return (
    <div>
      <section className="flex justify-between items-center gap-4 flex-wrap">
        {searchResult[0] == -1 ? (
          <div className="flex justify-center items-center p-12 w-full">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : searchResult.length < 1 ? (
          <div>محصولی در این ارتباط یافت نشد!</div>
        ) : (
          searchResult.map((s, i) => <GraphicSliderBox key={i} itemData={s} />)
        )}
      </section>
    </div>
  );
};

export default ShopComponent;
