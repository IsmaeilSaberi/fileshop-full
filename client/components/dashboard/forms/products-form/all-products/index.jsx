"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "./Box";
import Image from "next/image";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const AllProducts = ({ setProductDetailCtrl, setRandNumForProductClick }) => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));

  const [products, setProducts] = useState([-1]);
  const [btnNumbers, setBtnNumbers] = useState([-1]);
  const [filteredBtns, setFilteredBtns] = useState([-1]);
  const [pageNumber, setPageNumber] = useState(1);
  const [allProductsNumbers, setAllProductsNumbers] = useState(0);
  const [categoryUrl, setCategoryUrl] = useState("products");
  const paginate = 10;

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/${categoryUrl}?pn=${pageNumber}&&pgn=${paginate}`,
        {
          headers: { auth_cookie: auth_cookie },
        }
      )
      .then((d) => {
        setProducts(d.data.GoalProducts);
        setBtnNumbers([
          ...Array(Math.ceil(d.data.AllProductsNumber / paginate)).keys(),
        ]);
        setAllProductsNumbers(d.data.AllProductsNumber);
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
        console.log(err);
      });
  }, [pageNumber, categoryUrl]);

  useEffect(() => {
    if (btnNumbers[0] != -1 && btnNumbers.length > 0) {
      const arr = [];
      btnNumbers.map((n) => {
        if (
          n == 0 ||
          (n < pageNumber + 1 && n > pageNumber - 3) ||
          n == btnNumbers.length - 1
        ) {
          arr.push(n);
        }
      });
      setFilteredBtns(arr);
    } else if (btnNumbers.length == 0) {
      setFilteredBtns([]);
    }
  }, [btnNumbers]);

  return (
    <div className=" flex flex-col gap-8">
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm text-black flex justify-center items-center gap-4">
          <button
            onClick={() => {
              categoryUrl == "products" ? console.log("") : setProducts([-1]);
              setCategoryUrl("products");
              setPageNumber(1);
            }}
            className={
              categoryUrl == "products"
                ? "bg-orange-300 rounded border-2 py-2 px-2 border-black transition-all duration-200 hover:bg-orange-400"
                : "bg-yellow-300 rounded border-2 py-2 px-2 border-black transition-all duration-200 hover:bg-yellow-400"
            }
          >
            همه دسته ها
          </button>
          <button
            onClick={() => {
              categoryUrl == "get-products-of-type/book"
                ? console.log("")
                : setProducts([-1]);
              setCategoryUrl("get-products-of-type/book");
              setPageNumber(1);
            }}
            className={
              categoryUrl == "get-products-of-type/book"
                ? "bg-orange-300 rounded border-2 py-2 px-2 border-black transition-all duration-200 hover:bg-orange-400"
                : "bg-yellow-300 rounded border-2 py-2 px-2 border-black transition-all duration-200 hover:bg-yellow-400"
            }
          >
            کتاب ها
          </button>
          <button
            onClick={() => {
              categoryUrl == "get-products-of-type/app"
                ? console.log("")
                : setProducts([-1]);
              setCategoryUrl("get-products-of-type/app");
              setPageNumber(1);
            }}
            className={
              categoryUrl == "get-products-of-type/app"
                ? "bg-orange-300 rounded border-2 py-2 px-2 border-black transition-all duration-200 hover:bg-orange-400"
                : "bg-yellow-300 rounded border-2 py-2 px-2 border-black transition-all duration-200 hover:bg-yellow-400"
            }
          >
            اپلیکیشن ها
          </button>
          <button
            onClick={() => {
              categoryUrl == "get-products-of-type/gr"
                ? console.log("")
                : setProducts([-1]);
              setCategoryUrl("get-products-of-type/gr");
              setPageNumber(1);
            }}
            className={
              categoryUrl == "get-products-of-type/gr"
                ? "bg-orange-300 rounded border-2 py-2 px-2 border-black transition-all duration-200 hover:bg-orange-400"
                : "bg-yellow-300 rounded border-2 py-2 px-2 border-black transition-all duration-200 hover:bg-yellow-400"
            }
          >
            فایل های گرافیکی
          </button>
        </div>
        <div className="w-32 h-10 rounded-md bg-indigo-500 flex justify-center items-center text-white">
          {allProductsNumbers} محصول
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {products[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : products.length < 1 ? (
          <div className="flex justify-center items-center w-full p-8">
            محصولی موجود نیست!
          </div>
        ) : (
          products.map((product, i) => (
            <Box
              key={i}
              setRandNumForProductClick={setRandNumForProductClick}
              setProductDetailCtrl={setProductDetailCtrl}
              data={product}
            />
          ))
        )}
      </div>
      <div className="flex justify-center items-center gap-2">
        {filteredBtns[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image alt="loading" width={40} height={40} src={"/loading.svg"} />
          </div>
        ) : (
          filteredBtns.map((n, i) => (
            <button
              className={
                n + 1 == pageNumber
                  ? "rounded-full w-8 h-8 bg-orange-400 text-white flex justify-center items-center transition-all duration-300 hover:bg-orange-500"
                  : "rounded-full w-8 h-8 bg-indigo-500 text-white flex justify-center items-center transition-all duration-300 hover:bg-orange-500"
              }
              onClick={() => {
                n + 1 == pageNumber ? console.log("") : setProducts([-1]);
                setPageNumber(n + 1);
                goToTop();
              }}
              key={i}
            >
              {n + 1}
            </button>
          ))
        )}
      </div>
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

export default AllProducts;
