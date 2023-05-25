"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import CommentBox from "../comment-box";

const CommentRepliesList = ({ goalId, commentProps }) => {
  const [commentReplies, setCommentReplies] = useState([-1]);

  useEffect(() => {
    const backendUrl = `https://fileshop-server.iran.liara.run/api/get-comment-children/${goalId}`;
    axios
      .get(backendUrl)
      .then((d) => {
        setCommentReplies(d.data);
      })
      .catch((err) => {
        const errorMsg =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : "خطا در لود دیدگاه!";
      });
  }, [goalId]);

  return (
    <div>
      {commentReplies[0] == -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
        </div>
      ) : commentReplies.length < 1 ? (
        <div>پاسخ خود را در اینجا ثبت کنید!</div>
      ) : (
        <div className="flex flex-col gap-6">
          {commentReplies.map((da, i) => (
            <CommentBox commentProps={commentProps} key={i} data={da} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentRepliesList;
