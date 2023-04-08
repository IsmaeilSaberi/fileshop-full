"use client";
import { useState, useEffect } from "react";
import AllPosts from "./all-posts";
import NewPost from "./new-post";
import PostDetails from "./post-details";

const PostMain = () => {
  const [middleBannerDetailCtrl, setMiddleBannerDetailCtrl] = useState("");
  const [randNumForBannerClick, setRandNumForBannerClick] = useState(1);
  const [details, setDetails] = useState(
    <AllPosts
      setRandNumForBannerClick={setRandNumForBannerClick}
      setMiddleBannerDetailCtrl={setMiddleBannerDetailCtrl}
    />
  );

  useEffect(() => {
    if (middleBannerDetailCtrl != "") {
      setDetails(<PostDetails postId={middleBannerDetailCtrl} />);
    }
  }, [randNumForBannerClick]);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">پست ها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllPosts
                  setRandNumForBannerClick={setRandNumForBannerClick}
                  setMiddleBannerDetailCtrl={setMiddleBannerDetailCtrl}
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
