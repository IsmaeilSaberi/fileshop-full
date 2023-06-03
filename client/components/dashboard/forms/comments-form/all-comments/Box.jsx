"use client";

const Box = ({ data, setCommentDetailCtrl, setRandNumForCommentClick }) => {
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
        setCommentDetailCtrl(data._id);
        setRandNumForCommentClick(Math.random());
      }}
      className="relative flex justify-start gap-8 items-center w-full h-32 cursor-pointer p-6 rounded-lg border-2 border-zinc-200 bg-zinc-100 transition-all duration-200 hover:border-orange-500"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="m-2">ایمیل: {data.email}</div>
        <div className="text-xs absolute top-3 left-3 bg-orange-500 text-white flex justify-center items-center w-28 h-6 rounded">
          {data.createdAt}
        </div>
        <div className="absolute top-3 left-32 flex justify-end items-center gap-2">
          {data.viewed == true ? (
            <div></div>
          ) : (
            <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
              جدید
            </div>
          )}
        </div>
        <div className="text-xs absolute bottom-3 left-32 text-white rounded">
          {data.parentId == "nothing" ? (
            <div className="bg-sky-500 px-2 py-1 rounded">اصلی</div>
          ) : (
            <div className=" bg-sky-500 px-2 py-1 rounded">پاسخ</div>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex justify-end items-center gap-2">
          {data.published == true ? (
            <div className="text-xs bg-indigo-600 text-white flex justify-center items-center w-28 h-6 rounded">
              منتشر شده
            </div>
          ) : (
            <div className="text-xs bg-rose-600 text-white flex justify-center items-center w-28 h-6 rounded">
              منتشر نشده
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Box;
