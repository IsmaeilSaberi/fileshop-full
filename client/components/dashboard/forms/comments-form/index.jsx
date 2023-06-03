"use client";
import { useState, useEffect } from "react";
import AllComments from "./all-comments";
import CommentDetails from "./comment-details";
import NewUnviewedComments from "./all-comments/new-unviewed-comments";

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
    <div className="flex flex-col gap-10 relative pt-4 md:pt-8">
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">دیدگاهها</h1>
        <div className="flex justify-between md:justify-end items-center gap-10 md:gap-2">
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
          <button
            onClick={() =>
              setDetails(
                <NewUnviewedComments
                  setRandNumForCommentClick={setRandNumForCommentClick}
                  setCommentDetailCtrl={setCommentDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            دیدگاههای جدید
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default CommentsMain;
