"use client";
import { useState, useEffect } from "react";
import AllPosts from "./all-posts";
import NewPost from "./new-post";
import PostDetails from "./post-details";

const PostMain = () => {
  const [postDetailCtrl, setPostDetailCtrl] = useState("");
  const [randNumForPostClick, setRandNumForPostClick] = useState(1);
  const [details, setDetails] = useState(
    <AllPosts
      setRandNumForPostClick={setRandNumForPostClick}
      setPostDetailCtrl={setPostDetailCtrl}
    />
  );

  useEffect(() => {
    if (postDetailCtrl != "") {
      setDetails(<PostDetails postId={postDetailCtrl} />);
    }
  }, [randNumForPostClick]);

  return (
    <div className="flex flex-col gap-10 relative pt-4 md:pt-8">
      <section className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">پست ها</h1>
        <div className="flex justify-between md:justify-end items-center gap-10 md:gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllPosts
                  setRandNumForPostClick={setRandNumForPostClick}
                  setPostDetailCtrl={setPostDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() => setDetails(<NewPost />)}
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            پست جدید
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default PostMain;
