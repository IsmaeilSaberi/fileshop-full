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

  const [keyword, setKeyWord] = useState(
    url.keyword ? `keyword=${url.keyword}&` : ""
  );
  const [orderBy, setOrderBy] = useState(
    url.orderBy ? `orderBy=${url.orderBy}&` : ""
  );
  const [typeOfProduct, setTypeOfProduct] = useState(
    url.type ? `type=${url.type}&` : ""
  );
  const [maxPrice, setMaxPrice] = useState(url.maxP ? `maxP=${url.maxP}&` : "");
  const [minPrice, setMinPrice] = useState(url.minP ? `minP=${url.minP}&` : "");
  const [categories, setCategories] = useState(
    url.categories ? `categories=${url.categories}&` : ""
  );
  const [pgn, setPgn] = useState(url.pgn ? `pgn=${url.pgn}&` : "");
  const [pn, setPn] = useState(url.pn ? `pn=${url.pn}&` : "");

  const queries = `${keyword ? keyword : ""}${orderBy ? orderBy : ""}${
    typeOfProduct ? typeOfProduct : ""
  }${maxPrice ? maxPrice : ""}${minPrice ? minPrice : ""}${
    categories ? categories : ""
  }${pgn ? pgn : ""}${pn ? pn : ""}`;

  const mainFrontUrl = `/shop?${queries}`;
  const mainBackendUrl = `https://fileshop-server.iran.liara.run/api/search-products?${queries}`;

  useEffect(() => {
    router.push(mainFrontUrl);
    axios
      .get(mainBackendUrl)
      .then((d) => {
        setSearchResult(d.data.allProducts), setBtns(d.data.btns);
      })
      .catch((err) => console.log(err));
  }, [
    keyword,
    orderBy,
    typeOfProduct,
    maxPrice,
    minPrice,
    categories,
    pgn,
    pn,
  ]);

  //ORDER BY
  const orderByManager = (v) => {
    setSearchResult([-1]);
    setOrderBy(`orderBy=${v.target.value}&`);
  };

  return (
    <div className="container mx-auto flex justify-between items-start gap-2">
      <aside className="w-80 bg-zinc-100 rounded-lg p-2">
        <div className="flex flex-col gap-4">
          <div>مرتب سازی بر اساس</div>
          <div className="flex items-center flex-wrap gap-2">
            <div className="flex justify-center items-center gap-1 w-28 p-2 tesxt-base sm:text-xs border-2 border-zinc-200 rounded">
              <label htmlFor="date">جدیدترین</label>
              <input
                defaultChecked
                onClick={orderByManager}
                type="radio"
                name="orderBy"
                id="date"
                value={"date"}
              />
            </div>
            <div className="flex justify-center items-center gap-1 w-28 p-2 tesxt-base sm:text-xs border-2 border-zinc-200 rounded">
              <label htmlFor="price">قیمت</label>
              <input
                onClick={orderByManager}
                type="radio"
                name="orderBy"
                id="price"
                value={"price"}
              />
            </div>
            <div className="flex justify-center items-center gap-1 w-28 p-2 tesxt-base sm:text-xs border-2 border-zinc-200 rounded">
              <label htmlFor="pageView">پربازدیدترین</label>
              <input
                onClick={orderByManager}
                type="radio"
                name="orderBy"
                id="pageView"
                value={"pageView"}
              />
            </div>
            <div className="flex justify-center items-center gap-1 w-28 p-2 tesxt-base sm:text-xs border-2 border-zinc-200 rounded">
              <label htmlFor="buyNumber">پرفروش ترین</label>
              <input
                onClick={orderByManager}
                type="radio"
                name="orderBy"
                id="buyNumber"
                value={"buyNumber"}
              />
            </div>
          </div>
        </div>
      </aside>
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
                    setPgn(`pgn=12&`);
                    setPn(`pn=${b + 1}&`);
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
