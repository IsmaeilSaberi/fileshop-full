"use client";
import Image from "next/image";

const Box = ({ data, setPostDetailCtrl, setRandNumForPostClick }) => {
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
        setPostDetailCtrl(data._id);
        setRandNumForPostClick(Math.random());
      }}
      className="relative flex justify-start gap-8 items-center w-full cursor-pointer p-6 rounded-lg border-2 border-zinc-200 bg-zinc-100 transition-all duration-200 hover:border-orange-500"
    >
      <div className="flex justify-start items-center">
        <Image
          className="rounded-lg"
          alt={data.imageAlt}
          src={data.image}
          title={data.imageAlt}
          width={400}
          height={200}
        />
      </div>
      <div className="flex flex-col gap-4 h-40">
        <div className="mt-4">{data.title}</div>
        <div className="text-xs absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded">
          {data.updatedAt}
        </div>
        <div className="absolute bottom-3 left-3 flex justify-end items-center gap-2">
          <div className="text-xs bg-orange-500 text-white w-24 h-6 flex items-center justify-center rounded">
            {data.pageView} بازدید
          </div>
          {data.published == true ? (
            <div className="text-xs bg-green-500 text-white px-2 py-1 rounded">
              منتشر شده
            </div>
          ) : (
            <div className="text-xs bg-red-500 text-white px-2 py-1 rounded">
              پیش نویس
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Box;
