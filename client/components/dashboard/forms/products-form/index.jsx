"use client";
import { useState, useEffect } from "react";
import AllProducts from "./all-products";
import NewProduct from "./new-product";
import ProductDetails from "./product-details";

const ProductMain = () => {
  const [productDetailCtrl, setProductDetailCtrl] = useState("");
  const [randNumForProductClick, setRandNumForProductClick] = useState(1);
  const [details, setDetails] = useState(
    <AllProducts
      setRandNumForProductClick={setRandNumForProductClick}
      setProductDetailCtrl={setProductDetailCtrl}
    />
  );

  useEffect(() => {
    if (productDetailCtrl != "") {
      setDetails(<ProductDetails productId={productDetailCtrl} />);
    }
  }, [randNumForProductClick]);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg"> محصولات</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllProducts
                  setRandNumForProductClick={setRandNumForProductClick}
                  setProductDetailCtrl={setProductDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDetails(<NewProduct />)}
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            محصول جدید
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default ProductMain;
