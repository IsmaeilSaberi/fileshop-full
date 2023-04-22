"use client";
import Image from "next/image";

const Box = ({ data, setProductDetailCtrl, setRandNumForProductClick }) => {
  //// MAKE PRICE NUMBER BEAUTIFUL
  function priceChanger(num) {
    // Convert the number to a string
    num = num.toString();
    // Split the string into an array of three-digit chunks
    let chunks = [];
    while (num.length > 0) {
      chunks.push(num.slice(-3));
      num = num.slice(0, -3);
    }
    // Reverse the order of the chunks and join them with commas
    return chunks.reverse().join(",");
  }

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
        setProductDetailCtrl(data._id);
        setRandNumForProductClick(Math.random());
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
        <div className="">{data.title}</div>

        <div className="absolute top-3 left-3 flex text-white justify-end items-center gap-2">
          <div className="text-xs  bg-blue-500  px-2 py-1 rounded">
            {data.updatedAt}
          </div>
          <div className="text-xs  bg-blue-500  px-2 py-1 rounded">
            {data.buyNumber} فروش
          </div>
          <div className="text-xs  bg-blue-500  px-2 py-1 rounded">
            {priceChanger(data.price)} تومان
          </div>
        </div>
        <div className="absolute bottom-3 left-3 flex text-xs text-white justify-end items-center gap-2">
          <div className="bg-blue-600   rounded-md px-3 py-1">
            {data.typeOfProduct == "gr"
              ? "فایل گرافیکی"
              : data.typeOfProduct == "book"
              ? "کتاب"
              : "اپلیکیشن"}
          </div>
          <div className="bg-orange-500  w-24 h-6 flex items-center justify-center rounded">
            {data.pageView} بازدید
          </div>
          {data.published == true ? (
            <div className="bg-green-500  px-2 py-1 rounded">منتشر شده</div>
          ) : (
            <div className="bg-red-500  px-2 py-1 rounded">پیش نویس</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Box;
