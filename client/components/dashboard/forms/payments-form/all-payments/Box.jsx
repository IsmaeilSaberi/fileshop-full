"use client";

const Box = ({ data, setPaymentDetailCtrl, setRandNumForPaymentClick }) => {
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

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
  return (
    <div
      onClick={() => {
        goToTop();
        setPaymentDetailCtrl(data._id);
        setRandNumForPaymentClick(Math.random());
      }}
      className="relative flex justify-start gap-8 items-center w-full cursor-pointer p-6 rounded-lg border-2 border-zinc-200 bg-zinc-100 transition-all duration-200 hover:border-orange-500"
    >
      <div className="flex flex-col gap-4">
        <div className="">مبلغ : {priceChanger(data.amount)} تومان</div>
        <div className="">ایمیل: {data.email}</div>
        <div className="text-xs absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded">
          {data.updatedAt}
        </div>
        <div className="text-xs absolute top-3 left-32 text-white rounded">
          {data.payed == true ? (
            <div className="bg-green-500 px-2 py-1 rounded">پرداخت شده</div>
          ) : (
            <div className=" bg-rose-500 px-2 py-1 rounded">پرداخت نشده</div>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex justify-end items-center gap-2">
          {data.viewed == true ? (
            <div></div>
          ) : (
            <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
              جدید
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Box;
