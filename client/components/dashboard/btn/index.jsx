"use client";

const DCBtn = ({
  title,
  content,
  setContentChanger,
  setColorChanger,
  colorChanger,
}) => {
  return (
    <button
      onClick={() => {
        setContentChanger(content);
        setColorChanger(content);
      }}
      className={
        colorChanger == content
          ? "w-40 h-12 rounded-md flex justify-center items-center bg-indigo-600 text-white transition-all duration-200 hover:bg-indigo-400"
          : "w-40 h-12 rounded-md flex justify-center items-center bg-orange-500 text-white transition-all duration-200 hover:bg-indigo-400"
      }
    >
      {title}
    </button>
  );
};

export default DCBtn;
