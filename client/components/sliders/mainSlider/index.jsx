"use client";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

import { useState } from "react";
import "animate.css";

const MainSlider = () => {
  const data = [
    {
      sorter: 0,
      img: "/images/slider/slide1.jpg",
      title:
        "متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را",
      desc: "ست از متن‌های آزمایشی و  رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفح",
      slug: "slide1",
      price: "125000",
    },
    {
      sorter: 1,
      img: "/images/slider/slide2.jpg",
      title: "چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نو",
      desc: "که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرح",
      slug: "slide2",
      price: "260000",
    },
    {
      sorter: 2,
      img: "/images/slider/slide3.jpg",
      title: "صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه",
      desc: "آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را ",
      slug: "slide3",
      price: "380000",
    },
  ];

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
    <section className="container mx-auto flex flex-col gap-40 relative p-2">
      <div className=" btns z-30 absolute left-12 top-4 flex gap-1">
        <FaChevronRight
          onClick={() => {
            setslideHandler(0);
            setTimeout(() => {
              sliderChangingHandler(-1);
              setslideHandler(1);
            }, 1000);
          }}
          className="bg-white w-10 h-10 p-2 rounded border-zinc-800 border-[.2rem] cursor-pointer hover:border-zinc-500 transition-all duration-500"
        />

        <FaChevronLeft
          onClick={() => {
            setslideHandler(0);
            setTimeout(() => {
              sliderChangingHandler(1);
              setslideHandler(1);
            }, 1000);
          }}
          className="bg-white w-10 h-10 p-2 rounded border-zinc-800 border-[.2rem] cursor-pointer hover:border-zinc-500 transition-all duration-500"
        />
      </div>
      <div className=" flex z-20 justify-center items-center gap-6 ">
        <Image
          width={1200}
          height={300}
          className={
            slideHandler == 1
              ? "rounded-xl animate__animated  animate__bounceIn animate__slow"
              : "rounded-xl animate__animated  animate__bounceOut animate__slow"
          }
          alt={data[nowSlide].title}
          src={data[nowSlide].img}
        />
      </div>
    </section>
  );
};

export default MainSlider;
