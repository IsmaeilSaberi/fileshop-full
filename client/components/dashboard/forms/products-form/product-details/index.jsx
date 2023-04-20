"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ productId }) => {
  // the part for prevent for submitting with enter key
  const formKeyNotSuber = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  };

  /// go to top or scroll up smoothly function
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

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
        featureList = [...feature, data.replace(/\s+/g, "_").toLowerCase()];
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
      .get(categoriesUrl)
      .then((d) => {
        setCategories(d.data);
      })
      .catch((err) => console.log("error in loading categories"));
  }, []);

  const [relatedCategories, setRelatedCategories] = useState([]);
  const productsCategoriesManager = (v) => {
    let related = [...relatedCategories];
    if (v.target.checked) {
      related = [...related, v.target.value];
    } else {
      related.splice(relatedCategories.indexOf(v.target.value), 1);
    }
    setRelatedCategories(related);
  };

  ////RELATED PRODUCTS
  const [products, setProducts] = useState([-1]);
  useEffect(() => {
    const productsUrl =
      "https://fileshop-server.iran.liara.run/api/related-products";
    axios
      .get(productsUrl)
      .then((d) => {
        setProducts(d.data);
      })
      .catch((err) => console.log("error in loading products"));
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

  // this part used for getting one product details for using in default values
  const [fullData, setFullData] = useState([-1]);
  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/get-product-by-id/${productId}`
      )
      .then((d) => {
        setFullData(d.data);
        setTag(d.data.tags);
        setFeature(d.data.features);
        setRelatedProducts(d.data.relatedProducts);
        setRelatedCategories(d.data.categories);
      })
      .catch((err) => {
        toast.error("خطا در لود اطلاعات!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, [productId]);

  // here we update a product details
  const updater = (e) => {
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
    const url = `https://fileshop-server.iran.liara.run/api/update-product/${productId}`;
    axios
      .post(url, formData)
      .then((d) => {
        formData.published == "true"
          ? toast.success("محصول با موفقیت آپدیت و منتشر شد.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          : toast.success(
              "محصول با موفقیت آپدیت و به صورت پیش نویس ذخیره شد.",
              {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
      })
      .catch((err) => {
        console.log(err);
        let message = "خطایی در آپدیت و ذخیره محصول رخ داد.";
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

  // this part is used to delete a product
  const remover = (e) => {
    const url = `https://fileshop-server.iran.liara.run/api/remove-product/${productId}`;
    axios
      .post(url)
      .then((d) =>
        toast.success("محصول با موفقیت حذف شد.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((err) =>
        toast.error("حذف موفقیت آمیز نبود!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  return (
    <div className="flex flex-col gap-6">
      {fullData[0] == -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-orange-500 text-lg">جزئیات محصول</h2>
            <div className="flex justify-end items-center gap-2">
              <Link
                href={`/shop/${fullData.slug}`}
                className="bg-blue-400 text-white px-3 py-1 rounded-md text-sm transition-all duration-200 hover:bg-blue-500"
              >
                لینک محصول
              </Link>
              <button
                onClick={() => remover()}
                className="bg-rose-400 text-white px-3 py-1 rounded-md text-xs transition-all duration-200 hover:bg-rose-500"
              >
                حذف
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="bg-zinc-200 rounded px-3 py-1 text-sm">
              {fullData._id ? fullData._id : ""}
            </div>
            <div className="bg-zinc-200 rounded px-3 py-1 text-sm">
              تاریخ ایجاد {fullData.createdAt ? fullData.createdAt : ""}
            </div>
            <div className="bg-zinc-200 rounded px-3 py-1 text-sm">
              به روز رسانی {fullData.updatedAt ? fullData.updatedAt : ""}
            </div>
            <div className="bg-zinc-200 rounded px-3 py-1 text-sm">
              {fullData.pageView ? fullData.pageView : 0} بازدید
            </div>
            <div className="bg-zinc-200 rounded px-3 py-1 text-sm">
              {fullData.buyNumber ? fullData.buyNumber : 0} فروش
            </div>
          </div>
          <form
            onKeyDown={formKeyNotSuber}
            onSubmit={updater}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <div>عنوان جدید محصول</div>
              <input
                defaultValue={fullData.title ? fullData.title : ""}
                required={true}
                type="text"
                ref={titleRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>آدرس جدید فایل اصلی محصول</div>
              <input
                defaultValue={fullData.mainFile ? fullData.mainFile : ""}
                required={true}
                type="text"
                ref={mainFileRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>اسلاگ جدید محصول</div>
              <input
                defaultValue={fullData.slug ? fullData.slug : ""}
                required={true}
                type="text"
                ref={slugRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>قیمت جدید محصول(تومان)</div>
              <input
                defaultValue={fullData.price ? fullData.price : ""}
                required={true}
                type="number"
                ref={priceRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>آدرس جدید عکس</div>
              <input
                defaultValue={fullData.image ? fullData.image : ""}
                required={true}
                type="text"
                ref={imageRef}
                className="inputLtr p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>آلت جدید عکس</div>
              <input
                defaultValue={fullData.imageAlt ? fullData.imageAlt : ""}
                required={true}
                type="text"
                ref={imageAltRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>توضیحات کوتاه جدید</div>
              <input
                defaultValue={fullData.shortDesc ? fullData.shortDesc : ""}
                type="text"
                required={true}
                ref={shortDescRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>توضیحات کامل جدید</div>
              <textarea
                defaultValue={fullData.longDesc ? fullData.longDesc : ""}
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
                          className="text-indigo-500 flex items-center"
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
              <h3>ویژگی های جدید</h3>
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
                      {fullData.categories &&
                      fullData.categories.includes(cat._id) ? (
                        <input
                          name={cat._id}
                          id={cat._id}
                          onChange={productsCategoriesManager}
                          value={cat._id}
                          type="checkbox"
                          defaultChecked
                        />
                      ) : (
                        <input
                          name={cat._id}
                          id={cat._id}
                          onChange={productsCategoriesManager}
                          value={cat._id}
                          type="checkbox"
                        />
                      )}
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
                  {products.map((pr, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-md border border-indigo-400"
                    >
                      <label htmlFor={pr._id}>{pr.title}</label>
                      {fullData.relatedProducts &&
                      fullData.relatedProducts.includes(pr._id) ? (
                        <input
                          name={pr._id}
                          id={pr._id}
                          onChange={relatedProductsManager}
                          value={pr._id}
                          type="checkbox"
                          defaultChecked
                        />
                      ) : (
                        <input
                          name={pr._id}
                          id={pr._id}
                          onChange={relatedProductsManager}
                          value={pr._id}
                          type="checkbox"
                        />
                      )}
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
                {fullData.typeOfProduct && fullData.typeOfProduct == "book" ? (
                  <>
                    <option value={"book"}>کتاب</option>
                    <option value={"app"}>اپلیکیشن</option>
                    <option value={"gr"}>فایل گرافیکی</option>
                  </>
                ) : fullData.typeOfProduct &&
                  fullData.typeOfProduct == "app" ? (
                  <>
                    <option value={"app"}>اپلیکیشن</option>
                    <option value={"book"}>کتاب</option>
                    <option value={"gr"}>فایل گرافیکی</option>
                  </>
                ) : (
                  <>
                    <option value={"gr"}>فایل گرافیکی</option>
                    <option value={"book"}>کتاب</option>
                    <option value={"app"}>اپلیکیشن</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>منتشر شود</div>
              <select
                ref={publishedRef}
                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
              >
                {fullData.published && fullData.published == true ? (
                  <>
                    <option value="true">انتشار</option>
                    <option value="false">پیش نویس</option>
                  </>
                ) : (
                  <>
                    <option value="false">پیش نویس</option>
                    <option value="true">انتشار</option>
                  </>
                )}
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 p-2 w-full rounded-md text-white transition-all duration-200 hover:bg-orange-500"
            >
              بروز رسانی
            </button>
          </form>
        </div>
      )}
      <ToastContainer
        bodyClassName={() => "font-[shabnam] text-sm flex items-center"}
        position="top-right"
        autoClose={3000}
        theme="colored"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ProductDetails;
