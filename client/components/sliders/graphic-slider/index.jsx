"use client";

import GraphicSliderBox from "./graphicSliderBox";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { useRef } from "react";
import Link from "next/link";

const GraphicSlider = () => {
  const carouselRef = useRef();
  const carouselSwitcher = (data) => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo(
        carouselRef.current.scrollLeft + width * data,
        0
      );
    }
  };

  return (
    <div className="container mx-auto">
      <section className="flex flex-col gap-3 m-2">
        <header className="m-4 flex justify-between items-center">
          <h2 className="text-orange-500 text-2xl border-orange-500 border-r-2 pr-2">
            فایل های گرافیکی
          </h2>
          <div className="flex gap-1 items-center">
            {/* <div className="flex items-center gap-1"></div> */}
            <AiOutlineRight
              onClick={() => carouselSwitcher(1)}
              className="cursor-pointer bg-zinc-200 transition-all duration-200 hover:bg-orange-500 w-10 h-10 p-2 rounded"
            />
            <AiOutlineLeft
              onClick={() => carouselSwitcher(-1)}
              className="cursor-pointer bg-zinc-200 transition-all duration-200 hover:bg-orange-500 w-10 h-10 p-2 rounded"
            />
            <Link
              className="bg-orange-500 px-4 border-2 py-2 rounded-lg transition-all duration-200 hover:bg-orange-600"
              href={`/`}
            >
              مشاهده ی همه
            </Link>
          </div>
        </header>
        <div
          ref={carouselRef}
          className="sliderContainer w-full max-w-7xl overflow-x-scroll"
        >
          <div className="flex justify-between itemas-center gap-2">
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
            <GraphicSliderBox />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GraphicSlider;
