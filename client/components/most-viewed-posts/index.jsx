"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MostViewedPosts = () => {
  const [posts, setPosts] = useState([-1]);

  useEffect(() => {
    axios
      .get("https://fileshop-server.iran.liara.run/api/get-most-popular-posts")
      .then((d) => {
        setPosts(d.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
      <h3 className="text-blue-500">پربازدیدترین مقالات</h3>
      <ul className="flex flex-col gap-2">
        {posts[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image alt="loading" width={40} height={40} src={"/loading.svg"} />
          </div>
        ) : posts.length < 1 ? (
          <div>مقاله ای موجود نیست!</div>
        ) : (
          posts.map((po, i) => (
            <li key={i}>
              <Link
                className="border-r-2 p-2 flex justify-start items-center text-base sm:text-sm border-zinc-600"
                href={`/blog/${po.slug}`}
              >
                {po.title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MostViewedPosts;
