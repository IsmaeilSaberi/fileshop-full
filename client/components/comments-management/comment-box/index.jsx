import { FaReply } from "react-icons/fa";

const CommentBox = ({ data }) => {
  return (
    <div className="bg-zinc-100 p-2 rounded-md flex flex-col gap-2">
      <div className="flex justify-between items-center flex-wrap">
        <div className="bg-zinc-200 rounded px-2 py-1">{data.displayname}</div>
        <div className="bg-orange-500 text-white rounded px-2 py-1">
          {data.createdAt}
        </div>
      </div>
      <p className="text-black leading-9 text-justify p-2">{data.message}</p>
      <div className="flex justify-end items-center gap-4">
        <div className="text-base sm:text-sm rounded h-8 bg-blue-600 px-2 text-white flex justify-center items-center">
          نمایش پاسخ ها
        </div>
        <FaReply className="w-8 h-8 bg-blue-600 px-2 text-white p-2 rounded rotate-180 " />
      </div>
    </div>
  );
};

export default CommentBox;
