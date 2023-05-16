"use client";

const Box = ({ data, setUserDetailCtrl, setRandNumForUserClick }) => {
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
        setUserDetailCtrl(data._id);
        setRandNumForUserClick(Math.random());
      }}
      className="relative flex justify-start gap-8 items-center w-full cursor-pointer p-6 rounded-lg border-2 border-zinc-200 bg-zinc-100 transition-all duration-200 hover:border-orange-500"
    >
      <div className="flex flex-col gap-4">
        <div className="">نام کاربری: {data.username}</div>
        <div className="">نام نمایشی: {data.displayname}</div>
        <div className="">ایمیل: {data.email}</div>
        <div className="text-xs absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded">
          {data.createdAt}
        </div>
        <div className="text-xs absolute top-3 left-32 text-white rounded">
          {data.userIsActive == true ? (
            <div className="bg-green-500 px-2 py-1 rounded">فعال</div>
          ) : (
            <div className=" bg-rose-500 px-2 py-1 rounded">غیر فعال</div>
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
