import Image from "next/image";
import BreadCrumb from "../../../components/breadCrumb";
import { AiOutlineEye } from "react-icons/ai";
import { TfiCommentAlt } from "react-icons/tfi";
import { MdDateRange } from "react-icons/md";
import RelatedPosts from "../../../components/sliders/related-posts";

const SingleBlog = () => {
  return (
    <div className="flex flex-col gap-8">
      <BreadCrumb
        secondTitle={"وبلاگ"}
        secondLink={"/blog"}
        title={"گام هایی اساسی برای سلامتی 1"}
      />
      <section className="flex justify-center items-center">
        <Image
          className="rounded-xl"
          alt="alt"
          width={800}
          height={400}
          src={"/images/middle-banner/1.jpg"}
          priority={true}
        />
      </section>
      <section className="flex flex-col gap-6">
        <h1 className="text-blue-500 text-lg">گام هایی اساسی برای سلامتی 1</h1>
        <div className="flex justify-start items-center gap-2 text-base sm:text-sm">
          <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
            <AiOutlineEye className="w-6 h-6" />
            <span>تعداد بازدید : </span>
            <span>5</span>
          </div>
          <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
            <TfiCommentAlt className="w-6 h-6" />
            <span>دیدگاهها : </span>
            <span>10</span>
          </div>
          <div className="bg-zinc-200 rounded-md p-2 flex justify-between items-center gap-2">
            <MdDateRange className="w-6 h-6" />
            <span>آخرین بروز رسانی : </span>
            <span>1402/01/01</span>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="text-xl">توضیحات کامل</h2>
        <p className="leading-9 text-justify">
          سلامتی، یکی از مهمترین ارزش‌هایی است که برای هر فرد وجود دارد. سلامتی
          به معنای روانی و جسمی خوب بودن و عدم وجود بیماری است. به همین دلیل،
          حفظ سلامتی بسیار مهم است. برای داشتن سلامتی بهتر، باید به غذاهای سالم
          و متعادل، ورزش منظم، خواب کافی و کاهش استرس توجه داشت. عدم توجه به این
          موارد می‌تواند منجر به بروز بیماری‌های مختلف شود که ممکن است برای
          درمان آنها زمان زیادی نیاز باشد. همچنین، مراقبت از دندان‌ها و بهداشت
          دهان و دندان نیز جزء مواردی است که باید برای حفظ سلامتی دندا سلامتی،
          یکی از مهمترین ارزش‌هایی است که برای هر فرد وجود دارد. سلامتی به معنای
          روانی و جسمی خوب بودن و عدم وجود بیماری است. به همین دلیل، حفظ سلامتی
          بسیار مهم است. برای داشتن سلامتی بهتر، باید به غذاهای سالم و متعادل،
          ورزش منظم، خواب کافی و کاهش استرس توجه داشت. سلامتی، یکی از مهمترین
          ارزش‌هایی است که برای هر فرد وجود دارد. سلامتی به معنای روانی و جسمی
          خوب بودن و عدم وجود بیماری است. به همین دلیل، حفظ سلامتی بسیار مهم
          است. برای داشتن سلامتی بهتر، باید به غذاهای سالم و متعادل، ورزش منظم،
          خواب کافی و کاهش استرس توجه داشت.
        </p>
      </section>
      <section>
        <RelatedPosts title={"محصولات مرتبط"} />
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="text-xl">دیدگاهها</h2>
        <form className="bg-gray-100 rounded-md h-48">1</form>
      </section>
    </div>
  );
};

export default SingleBlog;
