"use client";

const DCBtn = ({
  title,
  content,
  setContentChanger,
  setColorChanger,
  colorChanger,
  setMenuIsOpen,
}) => {
  ///SCROLL TO TOP
  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={() => {
        setContentChanger(content);
        setColorChanger(content);
        setMenuIsOpen(-1);
        goToTop();
      }}
      className={
        colorChanger == content
          ? "w-full md:w-40 h-8 md:h-12 text-base md:text-lg rounded-md flex justify-center items-center bg-indigo-600 text-white transition-all duration-200 hover:bg-indigo-400"
          : "w-full md:w-40 h-8 md:h-12 text-base md:text-lg rounded-md flex justify-center items-center bg-orange-500 text-white transition-all duration-200 hover:bg-indigo-400"
      }
    >
      {title}
    </button>
  );
};

export default DCBtn;
