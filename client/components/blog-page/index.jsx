"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogBox from "../blogs/blogbox";
import Image from "next/image";

const BlogPageComp = ({ url }) => {
  const [result, setResult] = useState([-1]);
  const [btns, setBtns] = useState([-1]);
  const [pgn, setPgn] = useState(url.pgn ? `pgn=${url.pgn}` : "pgn=2");
  const [pn, setPn] = useState(url.pn ? `&pn=${url.pn}` : "&pn=1");
  const [searchedPostsNumber, setSearchedPostsNumber] = useState(0);
  const [keyword, setKeyword] = useState(
    url.keyword ? `&keyword=${url.keyword}` : ""
  );

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/search-posts?${pgn}${pn}`
      )
      .then((d) => {
        setResult(d.data.allPosts);
        setBtns(d.data.btns);
        setSearchedPostsNumber(d.data.postsNumber);
      })
      .catch((err) => console.log(err));
  }, [pn]);

  return (
    <div className=" flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        {result[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : result.length < 1 ? (
          <div className="flex justify-center items-center w-full p-8">
            پستی موجود نیست!
          </div>
        ) : (
          <div className="flex flex-wrap justify-between items-center gap-2">
            {result.map((post, i) => (
              <BlogBox key={i} data={post} />
            ))}
          </div>
        )}
      </div>
      <section className="flex justify-center items-center gap-4 flex-wrap">
        {btns[0] == -1 ? (
          <div className="flex justify-center items-center p-12 w-full">
            <Image alt="loading" width={50} height={50} src={"/loading.svg"} />
          </div>
        ) : (
          btns.map((b, i) => (
            <button
              key={i}
              onClick={() => {
                if (pn == `&pn=${b + 1}`) {
                  goToTop();
                } else {
                  setPn(`&pn=${b + 1}`);
                  goToTop();
                  setResult([-1]);
                }
              }}
              className={
                pn == `&pn=${b + 1}`
                  ? "w-8 h-8 rounded border-2 bg-indigo-400 text-white border-indigo-500 transition-all duration-200 hover:bg-indigo-200"
                  : "w-8 h-8 rounded border-2 border-indigo-500 transition-all duration-200 hover:bg-indigo-200"
              }
            >
              {b + 1}
            </button>
          ))
        )}
      </section>
    </div>
  );
};

export default BlogPageComp;
