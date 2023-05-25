"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import CommentBox from "../comment-box";

const CommentsList = ({ commentProps }) => {
  const [modelAllComments, setModelAllComments] = useState([-1]);

  useEffect(() => {
    const backendUrl = `https://fileshop-server.iran.liara.run/api/get-model-comments`;
    const formData = {
      _id: commentProps.src_id,
    };
    axios
      .post(backendUrl, formData)
      .then((d) => {
        setModelAllComments(d.data);
      })
      .catch((err) => {
        const errorMsg =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : "خطا در لود دیدگاه!";
        toast.error(errorMsg, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, [commentProps.src_id]);

  return (
    <div>
      {modelAllComments[0] == -1 ? (
        <div className="flex justify-center items-center p-12">
          <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
        </div>
      ) : modelAllComments.length < 1 ? (
        <div>دیدگاهتان را در اینجا ثبت کنید!</div>
      ) : (
        <div className="flex flex-col gap-6">
          {modelAllComments.map((da, i) => (
            <CommentBox commentProps={commentProps} key={i} data={da} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
