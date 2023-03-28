"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper";
import Image from "next/image";
SwiperCore.use([Autoplay]);

const MainSlider = () => {
  return (
    <section className="container mx-auto p-2">
      <div className="flex justify-center items-center">
        <Image
          className="rounded-lg"
          src={"/images/slider/slide1.jpg"}
          alt="alt"
          width={1320}
          height={310}
        />
      </div>
      {/* <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination
        autoplay={{ delay: 3000 }}
        scrollbar={{ draggable: true }}
        className="mySwiper"
      >
        <SwiperSlide>
          {" "}
          <div className="flex justify-center items-center">
            <Image
              className="rounded-lg"
              src={"/images/slider/slide1.jpg"}
              alt="alt"
              width={1320}
              height={310}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center items-center">
            <Image
              className="rounded-lg"
              src={"/images/slider/slide2.jpg"}
              alt="alt"
              width={1320}
              height={310}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center items-center">
            <Image
              className="rounded-lg"
              src={"/images/slider/slide3.jpg"}
              alt="alt"
              width={1320}
              height={310}
            />
          </div>
        </SwiperSlide>
      </Swiper> */}
    </section>
  );
};

export default MainSlider;
