"use client";
import BlogBox from "../../blogs/blogbox";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { useRef } from "react";

const RelatedPosts = ({ title }) => {
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
      <div className="flex flex-col gap-4 m-2">
        <header className="m-4 flex justify-between items-center">
          <h2 className="text-xl">{title} </h2>
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
          </div>
        </header>
        <div
          ref={carouselRef}
          className="sliderContainer w-full max-w-5xl overflow-x-scroll"
        >
          <div className="flex justify-between itemas-center gap-2">
            <BlogBox />
            <BlogBox />
            <BlogBox />
            <BlogBox />
            <BlogBox />
            <BlogBox />
            <BlogBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;
