"use client";
import { FaReply } from "react-icons/fa";
import NewComment from "../new-comment";
import CommentRepliesList from "../comment-replies-list";
import { useState } from "react";

const CommentBox = ({ data, commentProps }) => {
  const [replyDisplayer, setReplyDisplayer] = useState(1);
  const [childrenDisplayer, setChildrenDisplayer] = useState(1);

  return (
    <div className="bg-zinc-100 border-2 border-zinc-400 p-2 rounded-md flex flex-col gap-2">
      <div className="flex justify-between items-center flex-wrap">
        <div className="bg-zinc-200 rounded px-2 py-1">{data.displayname}</div>
        <div className="bg-orange-500 text-white rounded px-2 py-1">
          {data.createdAt}
        </div>
      </div>
      <p className="text-black leading-9 text-justify p-2">{data.message}</p>
      <div className="flex justify-end items-center gap-4">
        <div
          onClick={() => setChildrenDisplayer(childrenDisplayer * -1)}
          className="cursor-pointer text-base sm:text-sm rounded h-8 bg-blue-600 px-2 text-white flex justify-center items-center"
        >
          نمایش پاسخ ها
        </div>
        <FaReply
          onClick={() => setReplyDisplayer(replyDisplayer * -1)}
          className="cursor-pointer w-8 h-8 bg-blue-600 px-2 text-white p-2 rounded rotate-180 "
        />
      </div>
      <div>
        {replyDisplayer == 1 ? (
          <div></div>
        ) : (
          <NewComment
            commentProps={commentProps}
            text={"ثبت پاسخ"}
            itemParentId={data._id}
          />
        )}
      </div>
      <div>
        {childrenDisplayer == 1 ? (
          <div></div>
        ) : (
          <CommentRepliesList commentProps={commentProps} goalId={data._id} />
        )}
      </div>
    </div>
  );
};

export default CommentBox;
