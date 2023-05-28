"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TfiCommentAlt } from "react-icons/tfi";

const CommentsNumber = ({ goalId }) => {
  const [commentsNumber, setCommentsNumber] = useState(-1);
  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/get-model-comments-number/${goalId}`
      )
      .then((d) => setCommentsNumber(d.data.number))
      .catch((err) => console.log(err));
  }, [goalId]);

  return (
    <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
      <TfiCommentAlt className="w-6 h-6" />
      <span>تعداد دیدگاه : </span>
      <span>
        {commentsNumber == -1 ? (
          <div className="flex justify-center items-center">
            <Image alt="loading" width={10} height={10} src={"/loading.svg"} />
          </div>
        ) : (
          commentsNumber
        )}
      </span>
    </div>
  );
};

export default CommentsNumber;
