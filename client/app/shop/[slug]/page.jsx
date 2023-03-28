import Image from "next/image";
import BreadCrumb from "../../../components/breadCrumb";
import { AiOutlineEye } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { TfiCommentAlt } from "react-icons/tfi";
import { MdDateRange } from "react-icons/md";
import RelatedPosts from "../../../components/sliders/related-posts";

const SingleBlog = () => {
  return (
    <div className="flex flex-col gap-8">
      <BreadCrumb
        secondTitle={"فروشگاه"}
        secondLink={"/shop"}
        title={"گام هایی اساسی برای سلامتی 2 details"}
      />
      <section className="flex justify-center items-center rounded-lg p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]">
        <div className="flex justify-start items-center gap-4 w-full">
          <div>
            {" "}
            <Image
              className="rounded-xl"
              alt="alt"
              width={400}
              height={200}
              src={"/images/middle-banner/1.jpg"}
              priority={true}
            />
          </div>
          <div className="flex flex-col h-[12rem] gap-6">
            <h1 className="text-lg">بهترین خودت باش-اسماعیل صابری</h1>
            <ul className="flex flex-col gap-3">
              <li className="flex justify-between items-center gap-2 w-48">
                <div className="flex justify-start items-center gap-1">
                  <TiTickOutline />
                  <span>ویدئو</span>
                </div>
                <div>100MB</div>
              </li>
              <li className="flex justify-between items-center gap-2 w-48">
                <div className="flex justify-start items-center gap-1">
                  <TiTickOutline />
                  <span>فایل صوتی</span>
                </div>
                <div>10MB</div>
              </li>
              <li className="flex justify-between items-center gap-2 w-48">
                <div className="flex justify-start items-center gap-1">
                  <TiTickOutline />
                  <span>حجم</span>
                </div>
                <div>download</div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="flex justify-between items-center gap-2">
        <div className="flex w-[19rem] justify-center transition-all duration-200 hover:bg-slate-200 items-center gap-4 bg-slate-100 p-2 rounded-md">
          <div className="flex justify-start items-center gap-2">
            <Image
              alt="alt"
              className="rounded-xl"
              width={100}
              height={100}
              src={"/images/icons/feedback.png"}
            />
            <div className="flex flex-col gap-3">
              <div className="font-bold text-base sm:text-sm">
                محصولات سلامتی
              </div>
              <div className="text-base sm:text-xs">
                برترین های حوزه ی سلامتی
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[19rem] justify-center transition-all duration-200 hover:bg-slate-200 items-center gap-4 bg-slate-100 p-2 rounded-md">
          <div className="flex justify-start items-center gap-2">
            <Image
              alt="alt"
              className="rounded-xl"
              width={100}
              height={100}
              src={"/images/icons/target1.png"}
            />
            <div className="flex flex-col gap-3">
              <div className="font-bold text-base sm:text-sm">
                محصولات سلامتی
              </div>
              <div className="text-base sm:text-xs">
                برترین های حوزه ی سلامتی
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[19rem] justify-center transition-all duration-200 hover:bg-slate-200 items-center gap-4 bg-slate-100 p-2 rounded-md">
          <div className="flex justify-start items-center gap-2">
            <Image
              alt="alt"
              className="rounded-xl"
              width={100}
              height={100}
              src={"/images/icons/trophy.png"}
            />
            <div className="flex flex-col gap-3">
              <div className="font-bold text-base sm:text-sm">
                محصولات سلامتی
              </div>
              <div className="text-base sm:text-xs">
                برترین های حوزه ی سلامتی
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 rounded-md p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]">
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
