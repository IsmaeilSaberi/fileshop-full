"use client";
import { useState, useEffect } from "react";
import AllComments from "./all-comments";
import CommentDetails from "./comment-details";

const CommentsMain = () => {
  const [commentDetailCtrl, setCommentDetailCtrl] = useState("");
  const [randNumForCommentClick, setRandNumForCommentClick] = useState(1);
  const [details, setDetails] = useState(
    <AllComments
      setRandNumForCommentClick={setRandNumForCommentClick}
      setCommentDetailCtrl={setCommentDetailCtrl}
    />
  );

  useEffect(() => {
    if (commentDetailCtrl != "") {
      setDetails(<CommentDetails commentId={commentDetailCtrl} />);
    }
  }, [randNumForCommentClick]);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">دیدگاهها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllComments
                  setRandNumForCommentClick={setRandNumForCommentClick}
                  setCommentDetailCtrl={setCommentDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            همه
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default CommentsMain;
