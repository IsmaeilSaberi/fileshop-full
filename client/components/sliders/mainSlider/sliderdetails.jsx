"use client";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

import { useState } from "react";
import "animate.css";

const SliderDetails = ({ data }) => {
  const [nowSlide, setnowSlide] = useState(0);
  const sliderChangingHandler = (inp) => {
    let newNumber = nowSlide + inp;
    if (newNumber > data.length - 1) {
      newNumber = 0;
    }
    if (newNumber < 0) {
      newNumber = data.length - 1;
    }
    setnowSlide(newNumber);
  };
  const [slideHandler, setslideHandler] = useState(1);

  return (
    <>
      {data.length < 1 ? (
        <></>
      ) : (
        <section className="container mx-auto flex flex-col gap-40 relative p-2">
          <div className="w-full btns z-30 absolute left-1 md:left-0 top-1/2 md:top-1/3 flex justify-between p-4 md:p-10 gap-1">
            <FaChevronRight
              onClick={() => {
                setslideHandler(0);
                setTimeout(() => {
                  sliderChangingHandler(-1);
                  setslideHandler(1);
                }, 1000);
              }}
              className="bg-transparent text-white w-8 h-8 md:w-10 md:h-10 p-2 rounded border-zinc-400 border-[.2rem] cursor-pointer hover:border-zinc-500 transition-all duration-500"
            />

            <FaChevronLeft
              onClick={() => {
                setslideHandler(0);
                setTimeout(() => {
                  sliderChangingHandler(1);
                  setslideHandler(1);
                }, 1000);
              }}
              className="bg-transparent text-white w-8 h-8 md:w-10 md:h-10 p-2 rounded border-zinc-400 border-[.2rem] cursor-pointer hover:border-zinc-500 transition-all duration-500"
            />
          </div>
          <Link
            href={data[nowSlide].link}
            className="mt-12 md:mt-0 flex z-20 justify-center items-center gap-6 "
          >
            <Image
              width={1200}
              height={300}
              className={
                slideHandler == 1
                  ? "rounded-xl animate__animated  animate__bounceIn animate__slow"
                  : "rounded-xl animate__animated  animate__bounceOut animate__slow"
              }
              alt={data[nowSlide].imageAlt}
              src={data[nowSlide].image}
            />
          </Link>
        </section>
      )}
    </>
  );
};

export default SliderDetails;
