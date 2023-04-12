"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "./Box";
import Image from "next/image";

const AllPosts = ({ setMiddleBannerDetailCtrl, setRandNumForBannerClick }) => {
  const [posts, setPosts] = useState([-1]);
  const [btnNumbers, setBtnNumbers] = useState([-1]);
  const [filteredBtns, setFilteredBtns] = useState([-1]);
  const [pageNumber, setPageNumber] = useState(1);
  const [allPostsNumbers, setAllPostsNumbers] = useState(0);
  const paginate = 10;

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://fileshop-server.iran.liara.run/api/posts?pn=${pageNumber}&&pgn=${paginate}`
      )
      .then((d) => {
        setPosts(d.data.GoalPosts);
        setBtnNumbers([
          ...Array(Math.ceil(d.data.AllPostsNumber / paginate)).keys(),
        ]);
        setAllPostsNumbers(d.data.AllPostsNumber);
      })
      .catch((err) => console.log(err));
  }, [pageNumber]);

  useEffect(() => {
    if (btnNumbers[0] != -1 && btnNumbers.length > 0) {
      const arr = [];
      btnNumbers.map((n) => {
        if (
          n == 0 ||
          (n < pageNumber + 1 && n > pageNumber - 3) ||
          n == btnNumbers.length - 1
        ) {
          arr.push(n);
        }
      });
      setFilteredBtns(arr);
    } else if (btnNumbers.length == 0) {
      setFilteredBtns([]);
    }
  }, [btnNumbers]);

  return (
    <div className=" flex flex-col gap-8">
      <div className="flex justify-end items-center">
        <div className="w-32 h-10 rounded-md bg-indigo-500 flex justify-center items-center text-white">
          {allPostsNumbers} مقاله
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {posts[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : posts.length < 1 ? (
          <div className="flex justify-center items-center w-full p-8">
            پستی موجود نیست!
          </div>
        ) : (
          posts.map((post, i) => (
            <Box
              key={i}
              setRandNumForBannerClick={setRandNumForBannerClick}
              setMiddleBannerDetailCtrl={setMiddleBannerDetailCtrl}
              data={post}
            />
          ))
        )}
      </div>
      <div className="flex justify-center items-center gap-2">
        {filteredBtns[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image alt="loading" width={40} height={40} src={"/loading.svg"} />
          </div>
        ) : (
          filteredBtns.map((n, i) => (
            <button
              className="rounded-full w-8 h-8 bg-indigo-500 text-white flex justify-center items-center transition-all duration-300 hover:bg-orange-500"
              onClick={() => {
                setPageNumber(n + 1);
                setPosts([-1]);
                goToTop();
              }}
              key={i}
            >
              {n + 1}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default AllPosts;
