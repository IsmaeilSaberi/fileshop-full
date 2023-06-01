"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import GraphicSliderBox from "../sliders/graphic-slider/graphicSliderBox";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";

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
  const [title, setTitle] = useState(url.keyword);

  const [keyword, setKeyword] = useState(
    url.keyword ? `&keyword=${url.keyword}` : ""
  );
  const [orderBy, setOrderBy] = useState(
    url.orderBy ? `&orderBy=${url.orderBy}` : "&orderBy=date"
  );
  const [typeOfProduct, setTypeOfProduct] = useState(
    url.type ? `&type=${url.type}` : ""
  );
  const [maxPrice, setMaxPrice] = useState(
    url.maxP ? `&maxP=${url.maxP}` : "&maxP=100000000"
  );
  const [maxPriceInputNumber, setMaxPriceInputNumber] = useState(
    url.maxP ? url.maxP : 100000000
  );
  const [minPrice, setMinPrice] = useState(
    url.minP ? `&minP=${url.minP}` : "&minP=0"
  );
  const [minPriceInputNumber, setMixPriceInputNumber] = useState(
    url.minP ? url.minP : 0
  );
  const [categories, setCategories] = useState(
    url.categories ? `&categories=${url.categories}` : ""
  );
  const [pgn, setPgn] = useState(url.pgn ? `&pgn=${url.pgn}` : "&pgn=12");
  const [pn, setPn] = useState(url.pn ? `&pn=${url.pn}` : "&pn=1");
  const [searchedProductsNumber, setSearchedProductsNumber] = useState(0);

  const queries = `${keyword ? keyword : ""}${orderBy ? orderBy : ""}${
    typeOfProduct ? typeOfProduct : ""
  }${maxPrice ? maxPrice : ""}${minPrice ? minPrice : ""}${
    categories ? categories : ""
  }${pgn ? pgn : ""}${pn ? pn : ""}`;

  const mainFrontUrl = `/shop?${queries}`;
  const mainBackendUrl = `https://fileshop-server.iran.liara.run/api/search-products?${queries}`;

  useEffect(() => {
    setMenuIsOpen(-1);
    setSearchResult([-1]);
    setPgn(`&pgn=12`);
    setBtns([-1]);
    goToTop();
    router.push(mainFrontUrl);
    axios
      .get(mainBackendUrl)
      .then((d) => {
        setSearchResult(d.data.allProducts);
        setBtns(d.data.btns);
        setSearchedProductsNumber(d.data.productsNumber);
      })
      .catch((err) => console.log("خطا!"));
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

  //KEYWORD
  useEffect(() => {
    url.keyword == undefined
      ? setTitle(``)
      : setTitle(url.keyword.split("_").join(" "));
    setPn(`&pn=1`);
    url.keyword && url.keyword.length > 0
      ? setKeyword(`&keyword=${url.keyword.replace(/\s+/g, "_")}`)
      : console.log("");
  }, [url.keyword]);

  //ORDER BY
  const orderByManager = (v) => {
    setOrderBy(`&orderBy=${v.target.value}`);
    setPn(`&pn=1`);
  };

  //TYPE OF PRODUCT
  const typeOfProductManager = (v) => {
    if (v.target.value == "allProducts") {
      setTypeOfProduct("");
      url.keyword == undefined ? setTitle(``) : setTitle(url.keyword);
    } else {
      setTypeOfProduct(`&type=${v.target.value}`);
      url.keyword == undefined
        ? setTitle(
            v.target.value == "app"
              ? ` از اپلیکیشن ها`
              : v.target.value == "gr"
              ? ` از فایل های گرافیکی`
              : ` از کتاب ها`
          )
        : setTitle(
            v.target.value == "app"
              ? `${url.keyword} از اپلیکیشن ها`
              : v.target.value == "gr"
              ? `${url.keyword} از فایل های گرافیکی`
              : `${url.keyword} از کتاب ها`
          );
    }
    setPn(`&pn=1`);
  };

  //PRICE
  const minPRef = useRef();
  const maxPRef = useRef();
  const priceManager = (e) => {
    e.preventDefault();
    if (maxPRef.current.value == "" || maxPRef.current.value < 0) {
      maxPRef.current.value = 1000000000;
    }
    if (minPRef.current.value == "" || minPRef.current.value < 0) {
      minPRef.current.value = 0;
    }
    setMaxPrice(`&maxP=${maxPRef.current.value}`);
    setMinPrice(`&minP=${minPRef.current.value}`);
    setPn(`&pn=1`);
    setMenuIsOpen(-1);
  };

  //CATEGORIES
  const [allCategories, setAllCategories] = useState([-1]);
  useEffect(() => {
    const url = "https://fileshop-server.iran.liara.run/api/product-categories";
    axios.get(url).then((d) => {
      setAllCategories(d.data);
    });
  }, []);

  const allCategoriesManager = (v) => {
    if (v.target.checked) {
      if (categories.length > 0) {
        setCategories(`${categories},${v.target.value}`);
      } else {
        setCategories(`&categories=${v.target.value}`);
      }
    } else {
      const numberOfComos = categories.split(",").length - 1;
      const a = categories.includes(`,${v.target.value}`)
        ? categories.replace(`,${v.target.value}`, "")
        : numberOfComos == 0
        ? ""
        : categories.replace(`${v.target.value},`, "");
      setCategories(a);
    }
    setPn(`&pn=1`);
  };

  //DEFAULT CATEGORIES
  const urlCategoriesSlugs = url.categories ? url.categories.split(",") : [];

  const urlCategoriesIds = [];
  urlCategoriesSlugs.map((c, i) => {
    for (let i = 0; i < allCategories.length; i++) {
      if (c == allCategories[i].slug) {
        urlCategoriesIds.push(allCategories[i]._id);
      }
    }
  });

  //FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);
  useEffect(() => {
    if (menuIsOpen == -1) {
      document.body.style.overflow = "auto";
    } else if (menuIsOpen == 1) {
      document.body.style.overflow = "hidden";
    }
  }, [menuIsOpen]);

  return (
    <div className="container mx-auto flex justify-between items-start gap-2">
      <aside
        className={
          menuIsOpen == -1
            ? "z-50 flex flex-col gap-1 md:gap-4 bg-gray-700 md:bg-transparent w-full md:w-80 h-[100vh] md:h-auto py-1 md:px-2 fixed top-0 bottom-0 left-[100%] -right-[100%] md:static transition-all duration-500 pt-10 md:pt-0"
            : "z-50 flex flex-col gap-1 md:gap-4 backdrop-blur-3xl md:bg-transparent w-full md:w-80 h-[100vh] md:h-auto py-1 md:px-2 fixed overflow-auto top-0 bottom-0 right-0 left-0 md:static transition-all duration-500 pt-10 md:pt-0"
        }
      >
        <div className="flex flex-col gap-1 md:gap-4 bg-transparent md:bg-zinc-100 md:rounded-lg p-2 text-black text-xs md:text-base">
          <div>مرتب سازی بر اساس</div>
          <div className="flex items-center justify-center 2xl:justify-between flex-wrap gap-2">
            <div className="flex justify-center items-center gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 hover:border-blue-400 rounded">
              <label htmlFor="date">جدیدترین</label>
              {orderBy == "&orderBy=date" ? (
                <input
                  defaultChecked
                  onClick={orderByManager}
                  type="radio"
                  name="orderBy"
                  id="date"
                  value={"date"}
                />
              ) : (
                <input
                  onClick={orderByManager}
                  type="radio"
                  name="orderBy"
                  id="date"
                  value={"date"}
                />
              )}
            </div>
            <div className="flex justify-center items-center gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 hover:border-blue-400 rounded">
              <label htmlFor="price">قیمت</label>
              {
                <input
                  onClick={orderByManager}
                  type="radio"
                  name="orderBy"
                  id="price"
                  value={"price"}
                  defaultChecked={orderBy == "&orderBy=price"}
                />
              }
            </div>
            <div className="flex justify-center items-center gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 hover:border-blue-400 rounded">
              <label htmlFor="pageView">پربازدیدترین</label>
              {orderBy == "&orderBy=pageView" ? (
                <input
                  onClick={orderByManager}
                  type="radio"
                  name="orderBy"
                  id="pageView"
                  value={"pageView"}
                  defaultChecked
                />
              ) : (
                <input
                  onClick={orderByManager}
                  type="radio"
                  name="orderBy"
                  id="pageView"
                  value={"pageView"}
                />
              )}
            </div>
            <div className="flex justify-center items-center gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 hover:border-blue-400 rounded">
              <label htmlFor="buyNumber">پرفروش ترین</label>
              {orderBy == "&orderBy=buyNumber" ? (
                <input
                  onClick={orderByManager}
                  type="radio"
                  name="orderBy"
                  id="buyNumber"
                  value={"buyNumber"}
                  defaultChecked
                />
              ) : (
                <input
                  onClick={orderByManager}
                  type="radio"
                  name="orderBy"
                  id="buyNumber"
                  value={"buyNumber"}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:gap-4 bg-transparent md:bg-zinc-100 md:rounded-lg p-2 text-black text-xs md:text-base">
          <div>نوع محصول</div>
          <div className="flex items-center justify-center 2xl:justify-between flex-wrap gap-2">
            <div className="flex justify-center items-center gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 rounded">
              <label htmlFor="allProducts">همه</label>
              {typeOfProduct == "" ? (
                <input
                  onClick={typeOfProductManager}
                  type="radio"
                  name="typeOfProduct"
                  id="allProducts"
                  value={"allProducts"}
                  defaultChecked
                />
              ) : (
                <input
                  onClick={typeOfProductManager}
                  type="radio"
                  name="typeOfProduct"
                  id="allProducts"
                  value={"allProducts"}
                />
              )}
            </div>
            <div className="flex justify-center items-center gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 hover:border-blue-400 rounded">
              <label htmlFor="app">اپلیکیشن</label>
              {typeOfProduct == "&type=app" ? (
                <input
                  onClick={typeOfProductManager}
                  type="radio"
                  name="typeOfProduct"
                  id="app"
                  value={"app"}
                  defaultChecked
                />
              ) : (
                <input
                  onClick={typeOfProductManager}
                  type="radio"
                  name="typeOfProduct"
                  id="app"
                  value={"app"}
                />
              )}
            </div>
            <div className="flex justify-center items-center gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 hover:border-blue-400 rounded">
              <label htmlFor="book">کتاب</label>
              {typeOfProduct == "&type=book" ? (
                <input
                  onClick={typeOfProductManager}
                  type="radio"
                  name="typeOfProduct"
                  id="book"
                  value={"book"}
                  defaultChecked
                />
              ) : (
                <input
                  onClick={typeOfProductManager}
                  type="radio"
                  name="typeOfProduct"
                  id="book"
                  value={"book"}
                />
              )}
            </div>
            <div className="flex justify-center items-center gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 hover:border-blue-400 rounded">
              <label htmlFor="gr">فایل گرافیکی</label>
              {typeOfProduct == "&type=gr" ? (
                <input
                  onClick={typeOfProductManager}
                  type="radio"
                  name="typeOfProduct"
                  id="gr"
                  value={"gr"}
                  defaultChecked
                />
              ) : (
                <input
                  onClick={typeOfProductManager}
                  type="radio"
                  name="typeOfProduct"
                  id="gr"
                  value={"gr"}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:gap-4 bg-transparent md:bg-zinc-100 md:rounded-lg p-2 text-black text-xs md:text-base">
          <div>بازه قیمت (تومان)</div>
          <form onSubmit={priceManager} className="flex flex-col gap-4">
            <div className="flex items-center justify-center 2xl:justify-between flex-wrap gap-2">
              <input
                className="inputLtr text-center text-black gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 focus:border-blue-400 rounded"
                type="number"
                ref={minPRef}
                placeholder="حداقل قیمت"
                defaultValue={minPriceInputNumber}
                min={0}
              />

              <input
                className="inputLtr text-center text-black gap-1 w-28 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 focus:border-blue-400 rounded"
                type="number"
                ref={maxPRef}
                placeholder="حداکثر قیمت"
                defaultValue={maxPriceInputNumber}
                min={0}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-60 md:w-full bg-orange-400 rounded h-8 md:h-10 flex justify-center items-center text-white transition-all duration-200 hover:bg-orange-500"
              >
                اعمال فیلتر قیمت
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-1 md:gap-4 bg-transparent md:bg-zinc-100 md:rounded-lg p-2 text-black text-xs md:text-base">
          <div>دسته بندی</div>
          <div className="flex items-center justify-center 2xl:justify-between flex-wrap gap-2">
            {allCategories[0] == -1 ? (
              <div className="flex justify-center items-center p-12 w-full">
                <Image
                  alt="loading"
                  width={40}
                  height={40}
                  src={"/loading.svg"}
                />
              </div>
            ) : allCategories.length < 1 ? (
              <div>دسته ای موجود نیست!</div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex justify-center md:justify-between items-center flex-wrap gap-2">
                  {allCategories.map((da, i) => (
                    <div
                      key={i}
                      className="flex w-25 justify-center items-center gap-1 p-1 md:p-2 tesxt-base sm:text-xs border-2  border-gray-400 md:border-zinc-200 transition-all duration-200 hover:border-blue-400 rounded"
                    >
                      <label htmlFor={da.slug}>{da.title}</label>
                      {urlCategoriesIds.length < 1 ? (
                        <input
                          onClick={allCategoriesManager}
                          type="checkbox"
                          id={da.slug}
                          value={da.slug}
                        />
                      ) : (
                        <input
                          key={i}
                          onClick={allCategoriesManager}
                          type="checkbox"
                          id={da.slug}
                          value={da.slug}
                          defaultChecked={urlCategoriesIds.includes(da._id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
      <main className="w-full bg-zinc-100 rounded-lg p-2 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-base md:text-xl text-indigo-600">
            محصولات <span className="text-red-500 p-1">{title}</span> فروشگاه
            فایل اسماعیل
          </h1>
          <div className="text-base sm:text-sm rounded-md border-2 border-indigo-600 w-28 h-8 flex justify-center items-center ">
            {searchedProductsNumber} محصول
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <section className="flex justify-center md:justify-between items-center gap-4 flex-wrap">
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
                    if (pn == `&pn=${b + 1}`) {
                      goToTop();
                    } else {
                      setPn(`&pn=${b + 1}`);
                      setPgn(`&pgn=12`);
                      goToTop();
                      setSearchResult([-1]);
                    }
                  }}
                  className={
                    pn == `&pn=${b + 1}`
                      ? "w-8 h-8 rounded border-2 bg-indigo-400 text-white border-indigo-500 transition-all duration-200 hover:bg-indigo-200"
                      : "w-8 h-8 rounded border-2 border-indigo-500 transition-all duration-200 hover:bg-indigo-200"
                  }
                >
                  {b + 1}
                </button>
              ))
            )}
          </section>
        </div>
      </main>
      <div className="fixed z-50 flex md:hidden top-3 left-3">
        <BiFilterAlt
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == -1
              ? "w-9 h-9 text-black flex"
              : "w-9 h-9 text-black hidden"
          }
        />
        <AiOutlineClose
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == 1
              ? "w-10 h-10 text-black flex"
              : "w-10 h-10 text-black hidden"
          }
        />
      </div>
    </div>
  );
};

export default ShopComponent;
