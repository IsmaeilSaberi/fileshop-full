"use client";
import BlogBox from "../../blogs/blogbox";
import GraphicSliderBox from "../graphic-slider/graphicSliderBox";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

const RelatedPosts = ({ typeOfModel, relatedModels, title }) => {
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

  const [relatedModelsData, setRelatedModelsData] = useState([-1]);
  const sendingDataForRel = { goalIds: relatedModels };
  useEffect(() => {
    const url =
      typeOfModel == "post"
        ? "https://fileshop-server.iran.liara.run/api/get-related-posts-by-id"
        : "https://fileshop-server.iran.liara.run/api/get-related-products-by-id";

    axios
      .post(url, sendingDataForRel)
      .then((d) => {
        setRelatedModelsData(d.data);
      })
      .catch((e) => console.log(e));
  }, [relatedModels]);

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
          <div className="flex justify-between itemas-center gap-2 ">
            {relatedModelsData[0] == -1 ? (
              <div className="w-full flex justify-center items-center p-12">
                <Image
                  alt="loading"
                  width={120}
                  height={120}
                  src={"/loading.svg"}
                />
              </div>
            ) : relatedModelsData.length < 1 ? (
              <div className="flex justify-center items-center p-4">
                محتوای مرتبطی موجود نیست!
              </div>
            ) : typeOfModel == "post" ? (
              relatedModelsData.map((da, i) => <BlogBox key={i} data={da} />)
            ) : (
              relatedModelsData.map((da, i) => (
                <GraphicSliderBox itemData={da} key={i} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;
