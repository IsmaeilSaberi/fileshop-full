"use client";
import { useState, useEffect } from "react";
import AllSliders from "./all-sliders";
import NewSlider from "./new-slider";
import SliderDetails from "./slider-details";

const SliderMain = () => {
  const [sliderDetailCtrl, setSliderDetailCtrl] = useState("");
  const [randNumForSliderClick, setRandNumForSliderClick] = useState(1);
  const [details, setDetails] = useState(
    <AllSliders
      setRandNumForSliderClick={setRandNumForSliderClick}
      setSliderDetailCtrl={setSliderDetailCtrl}
    />
  );

  useEffect(() => {
    if (sliderDetailCtrl != "") {
      setDetails(<SliderDetails sliderId={sliderDetailCtrl} />);
    }
  }, [randNumForSliderClick]);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">اسلایدرها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllSliders
                  setRandNumForSliderClick={setRandNumForSliderClick}
                  setSliderDetailCtrl={setSliderDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDetails(<NewSlider />)}
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            اسلایدر جدید
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default SliderMain;
