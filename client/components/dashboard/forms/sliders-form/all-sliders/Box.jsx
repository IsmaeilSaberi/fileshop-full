"use client";
import Image from "next/image";

const Box = ({ data, setSliderDetailCtrl, setRandNumForSliderClick }) => {
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={() => {
        goToTop();
        setSliderDetailCtrl(data._id);
        setRandNumForSliderClick(Math.random());
      }}
      className="relative flex justify-between items-center w-full cursor-pointer p-6 rounded-lg border-2 border-zinc-200 bg-zinc-100 transition-all duration-200 hover:border-orange-500"
    >
      <div className="flex justify-start items-center">
        <Image
          className="rounded-lg"
          alt={data.imageAlt}
          src={data.image}
          title={data.imageAlt}
          width={500}
          height={250}
        />
      </div>
      <div className="flex items-center gap-2 absolute bottom-5 left-5">
        {data.situation == true ? (
          <div className="text-xs bg-green-500 text-white px-2 py-1 rounded">
            روشن
          </div>
        ) : (
          <div className="text-xs bg-rose-500 text-white px-2 py-1 rounded">
            خاموش
          </div>
        )}
        <div className="text-xs bg-orange-500 text-white px-2 py-1 rounded">
          {data.date}
        </div>
        <div className="text-xs bg-orange-500 text-white px-2 py-1 rounded">
          اسلایدر {data.sorter} ام
        </div>
      </div>
    </div>
  );
};

export default Box;
