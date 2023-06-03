"use client";
import { useState, useEffect } from "react";
import AllCategories from "./all-categories";
import NewCategory from "./new-category";
import CategoryDetails from "./category-details";

const CategoryMain = () => {
  const [categoryDetailCtrl, setCategoryDetailCtrl] = useState("");
  const [randNumForCategoryClick, setRandNumForCategoryClick] = useState(1);
  const [details, setDetails] = useState(
    <AllCategories
      setRandNumForCategoryClick={setRandNumForCategoryClick}
      setCategoryDetailCtrl={setCategoryDetailCtrl}
    />
  );

  useEffect(() => {
    if (categoryDetailCtrl != "") {
      setDetails(<CategoryDetails categoryId={categoryDetailCtrl} />);
    }
  }, [randNumForCategoryClick]);

  return (
    <div className="flex flex-col gap-10 relative pt-4 md:pt-8">
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">دسته بندی های محصول</h1>
        <div className="flex justify-between md:justify-end items-center gap-10 md:gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllCategories
                  setRandNumForCategoryClick={setRandNumForCategoryClick}
                  setCategoryDetailCtrl={setCategoryDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDetails(<NewCategory />)}
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            دسته جدید
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default CategoryMain;
