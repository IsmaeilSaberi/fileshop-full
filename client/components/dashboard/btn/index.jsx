"use client";

const DCBtn = ({ title, content, setContentChanger }) => {
  return (
    <button
      onClick={() => setContentChanger(content)}
      className="w-40 h-12 rounded-md flex justify-center items-center bg-orange-500 text-white transition-all duration-200 hover:bg-blue-600"
    >
      {title}
    </button>
  );
};

export default DCBtn;
