"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const NewProduct = () => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  const titleRef = useRef();
  const slugRef = useRef();
  const mainFileRef = useRef();
  const imageRef = useRef();
  const imageAltRef = useRef();
  const shortDescRef = useRef();
  const longDescRef = useRef();
  const priceRef = useRef();
  const typeOfProductRef = useRef();
  const publishedRef = useRef();

  ///// the part for prevent for submitting with enter key
  const formKeyNotSuber = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  //// splitter
  const splitter = (val) => {
    return val.split("*");
  };

  //TAG MANAGING
  const tagRef = useRef();
  const [tag, setTag] = useState([]);
  const tagSuber = (e) => {
    if (e.key === "Enter") {
      let tagList = [...tag];
      const data = tagRef.current.value;
      if (data.length > 0) {
        tagList = [...tag, data.replace(/\s+/g, "_").toLowerCase()];
        setTag(tagList);
      }
      tagRef.current.value = "";
    }
  };

  const tagDeleter = (indexToRemove) => {
    setTag(tag.filter((_, index) => index !== indexToRemove));
  };

  //FEATURE MANAGING
  const featureRef = useRef();
  const [feature, setFeature] = useState([]);
  const featureSuber = (e) => {
    if (e.key === "Enter") {
      let featureList = [...feature];
      const data = featureRef.current.value;
      if (data.length > 0) {
        featureList = [...feature, data];
        setFeature(featureList);
      }
      featureRef.current.value = "";
    }
  };

  const featureDeleter = (indexToRemove) => {
    setFeature(feature.filter((_, index) => index !== indexToRemove));
  };

  ////RELATED CATEGORIES
  const [categories, setCategories] = useState([-1]);
  useEffect(() => {
    const categoriesUrl =
      "https://fileshop-server.iran.liara.run/api/product-categories";
    axios
      .get(categoriesUrl, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        setCategories(d.data);
      })
      .catch((err) => console.log("خطا!"));
  }, []);

  const [relatedCategories, setRelatedCategories] = useState([]);
  const productsCategoriesManager = (v) => {
    let related = [...relatedCategories];
    if (v.target.checked) {
      const goalArr = splitter(v.target.value);
      related = [
        ...related,
        {
          _id: goalArr[0],
          title: goalArr[1],
          slug: goalArr[2],
        },
      ];
    } else {
      const goalArr = splitter(v.target.value);
      related.splice(
        relatedCategories.indexOf({
          _id: goalArr[0],
          title: goalArr[1],
          slug: goalArr[2],
        }),
        1
      );
    }
    setRelatedCategories(related);
  };

  ////RELATED PRODUCTS
  const [products, setProducts] = useState([-1]);
  useEffect(() => {
    const productsUrl =
      "https://fileshop-server.iran.liara.run/api/related-products";
    axios
      .get(productsUrl, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        setProducts(d.data);
      })
      .catch((err) => console.log("خطا!"));
  }, []);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const relatedProductsManager = (v) => {
    let related = [...relatedProducts];
    if (v.target.checked) {
      related = [...related, v.target.value];
    } else {
      related.splice(relatedProducts.indexOf(v.target.value), 1);
    }
    setRelatedProducts(related);
  };

  const submitter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
    e.preventDefault();
    const formData = {
      title: titleRef.current.value,
      createdAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      updatedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      slug: slugRef.current.value,
      mainFile: mainFileRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
      imageAlt: imageAltRef.current.value,
      shortDesc: shortDescRef.current.value,
      longDesc: longDescRef.current.value,
      tags: tag,
      features: feature,
      typeOfProduct: typeOfProductRef.current.value,
      pageView: 0,
      published: publishedRef.current.value,
      comments: [],
      relatedProducts: relatedProducts,
      categories: relatedCategories,
    };

    const url = `https://fileshop-server.iran.liara.run/api/new-product`;
    axios
      .post(url, formData, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        formData.published == "true"
          ? toast.success("محصول با موفقیت منتشر شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success("محصول با موفقیت به صورت پیش نویس ذخیره شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      })
      .catch((err) => {
        let message = "خطایی در ذخیره و ایجاد محصول رخ داد.";
        if (err.response.data.msg) {
          message = err.response.data.msg;
        }
        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-orange-500 text-lg">محصول جدید</h2>
      <form
        onKeyDown={formKeyNotSuber}
        onSubmit={submitter}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <div>عنوان محصول</div>
          <input
            required={true}
            type="text"
            ref={titleRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>آدرس فایل اصلی محصول</div>
          <input
            required={true}
            type="text"
            ref={mainFileRef}
            className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>اسلاگ محصول</div>
          <input
            required={true}
            type="text"
            ref={slugRef}
            className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>قیمت محصول(تومان)</div>
          <input
            required={true}
            type="number"
            ref={priceRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>آدرس عکس</div>
          <input
            required={true}
            type="text"
            ref={imageRef}
            className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>آلت عکس</div>
          <input
            required={true}
            type="text"
            ref={imageAltRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>توضیحات کوتاه</div>
          <input
            type="text"
            required={true}
            ref={shortDescRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>توضیحات کامل</div>
          <textarea
            rows="8"
            type="text"
            required={true}
            ref={longDescRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          ></textarea>
        </div>
        <div className="tags flex flex-col gap-2">
          <h3>برچسب ها</h3>
          <div className="tags w-full flex flex-col gap-4">
            <div className="input flex gap-2 items-center">
              <input
                type="text"
                onKeyDown={tagSuber}
                ref={tagRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                placeholder="تگ را وارد کنید و اینتر بزنید..."
              />
            </div>
            <div className="tagResults flex gap-3 justify-start flex-wrap">
              {tag.map((t, index) => {
                return (
                  <div
                    key={t}
                    className="res flex gap-1 text-sm py-1 px-2 rounded-md border-2 border-zinc-600"
                  >
                    <i
                      className="text-indigo-500 flex items-center cursor-pointer"
                      onClick={() => {
                        tagDeleter(index);
                      }}
                    >
                      <span className="text-xs">{t}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </i>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="features flex flex-col gap-2">
          <h3>ویژگی ها</h3>
          <div className="tags w-full flex flex-col gap-4">
            <div className="input flex gap-2 items-center">
              <input
                type="text"
                onKeyDown={featureSuber}
                ref={featureRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                placeholder="نام ویژگی : توضیحات ویژگی"
              />
            </div>
            <div className="featureResults flex gap-3 justify-start flex-wrap">
              {feature.map((f, index) => {
                return (
                  <div
                    key={f}
                    className="res flex gap-1 text-sm py-1 px-2 rounded-md border-2 border-zinc-600"
                  >
                    <i
                      className="text-indigo-500 flex items-center"
                      onClick={() => {
                        featureDeleter(index);
                      }}
                    >
                      <span className="text-xs">{f}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </i>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="categories flex flex-col gap-2">
          <h3>دسته بندی ها</h3>
          {categories[0] == -1 ? (
            <div className="flex justify-center items-center p-12">
              <Image
                alt="loading"
                width={40}
                height={40}
                src={"/loading.svg"}
              />
            </div>
          ) : categories.length < 1 ? (
            <div className="p-3">دسته ای یافت نشد!</div>
          ) : (
            <div className="flex justify-start items center flex-wrap gap-2">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-md border border-indigo-400"
                >
                  <label htmlFor={cat._id}>{cat.title}</label>
                  <input
                    name={cat._id}
                    id={cat._id}
                    onChange={productsCategoriesManager}
                    value={`${cat._id}*${cat.title}*${cat.slug}`}
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="related flex flex-col gap-2">
          <h3>محصولات مرتبط</h3>
          {products[0] == -1 ? (
            <div className="flex justify-center items-center p-12">
              <Image
                alt="loading"
                width={40}
                height={40}
                src={"/loading.svg"}
              />
            </div>
          ) : products.length < 1 ? (
            <div className="p-3">محصولی یافت نشد!</div>
          ) : (
            <div className="flex justify-start items center flex-wrap gap-2">
              {products.map((pro, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-md border border-indigo-400"
                >
                  <label htmlFor={pro._id}>{pro.title}</label>
                  <input
                    name={pro._id}
                    id={pro._id}
                    onChange={relatedProductsManager}
                    value={pro._id}
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div>نوع محصول</div>
          <select
            ref={typeOfProductRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          >
            <option value={"book"}>کتاب</option>
            <option value={"app"}>اپلیکیشن</option>
            <option value={"gr"}>فایل گرافیکی</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <div>منتشر شود</div>
          <select
            ref={publishedRef}
            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
          >
            <option value="true">انتشار</option>
            <option value="false">پیش نویس</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 p-2 w-full rounded-md text-white transition-all duration-200 hover:bg-orange-500"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
