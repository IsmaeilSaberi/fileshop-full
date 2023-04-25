"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider2box from "../sliders/mainSlider/slider2box";
import GraphicSliderBox from "../sliders/graphic-slider/graphicSliderBox";

const ShopComponent = ({ url }) => {
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const router = useRouter();
  const [searchResult, setSearchResult] = useState([-1]);
  const [btns, setBtns] = useState([-1]);
  const pagination = url.pn ? `pgn=${url.pgn}&pn=${url.pn}&` : "";

  const keyword = url.keyword ? `keyword=${url.keyword}&` : "";

  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/search-products?${keyword}${pagination}`
      )
      .then((d) => {
        setSearchResult(d.data.allProducts), setBtns(d.data.btns);
      })
      .catch((err) => console.log(err));
  }, [url]);
  return (
    <div className="container mx-auto flex justify-between items-start gap-2">
      <aside className="w-80 bg-zinc-100 rounded-lg p-2">aside</aside>
      <main className="w-full bg-zinc-100 rounded-lg p-2 flex flex-col gap-8">
        <h1 className="text-xl text-indigo-600">
          محصولات <span className="text-red-500 p-2">{url.keyword}</span>{" "}
          فروشگاه فایل اسماعیل
        </h1>
        <div className="flex flex-col gap-6">
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
              searchResult.map((s, i) => (
                <GraphicSliderBox key={i} itemData={s} />
              ))
            )}
          </section>
          <section className="flex justify-center items-center gap-4 flex-wrap">
            {btns[0] == -1 ? (
              <div className="flex justify-center items-center p-12 w-full">
                <Image
                  alt="loading"
                  width={50}
                  height={50}
                  src={"/loading.svg"}
                />
              </div>
            ) : (
              btns.map((b, i) => (
                <button
                  key={i}
                  onClick={() => {
                    router.push(`/shop?${keyword}pgn=12&pn=${b + 1}`);
                    goToTop();
                    setSearchResult([-1]);
                  }}
                  className="w-8 h-8 rounded border-2 border-indigo-500 transition-all duration-200 hover:bg-indigo-100"
                >
                  {b + 1}
                </button>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ShopComponent;
