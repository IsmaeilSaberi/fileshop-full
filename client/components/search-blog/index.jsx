"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBlog = () => {
  const searchRef = useRef();
  const router = useRouter();

  const shopSearcher = (e) => {
    e.preventDefault();
    if (searchRef.current.value.length > 0) {
      const url = `/blog?keyword=${searchRef.current.value.replace(
        /\s+/g,
        "_"
      )}`;
      router.push(url);
      searchRef.current.value = "";
    } else {
      toast.error("فرم جستجو خالی است.", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={shopSearcher}
        className="border-zinc-700 border-2 p-2 rounded-md flex justify-between items-center"
      >
        <input
          type="text"
          ref={searchRef}
          className="bg-transparent px-2 py-1 text-sm outline-none"
          placeholder="جستجو در وبلاگ ... "
        />
        <button className="w-12 absolute left-6" type="submit">
          <AiOutlineSearch className="w-6 h-6" />
        </button>
      </form>
      <ToastContainer
        bodyClassName={() => "font-[shabnam] text-sm flex items-center"}
        position="top-right"
        autoClose={3000}
        theme="colored"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SearchBlog;
