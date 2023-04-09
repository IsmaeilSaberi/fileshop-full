import Image from "next/image";
import Link from "next/link";

const BlogBox = ({ data }) => {
  return (
    <article className="sliderItem p-2 transition-all duration-200 hover:mt-1">
      <div className="relative h-[28rem] w-72 bg-white rounded-md shadow-[0px_1px_10px_rgba(0,0,0,0.25)] hover:shadow-[0px_2px_10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-center p-1">
          <Link href={`/shop/${data.slug}`} target="_blank">
            <Image
              className="p-2"
              alt={data.imageAlt}
              width={288}
              height={120}
              src={data.image}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-2 ">
          <Link href={`/shop/${data.slug}`} target="_blank">
            <h3 className="m-2 line-clamp-2 h-11">{data.title}</h3>
          </Link>
          <p className="text-base sm:text-sm text-justify m-2 line-clamp-3 h-24">
            {data.shortDesc}
          </p>
          <div className="h-1 w-[90%] mx-auto bg-zinc-300"></div>
          <div className="flex justify-between items-center m-1">
            <div className="text-base sm:text-sm bg-zinc-400 rounded-md py-1 px-3">
              {data.updatedAt}
            </div>
            <div className="text-base sm:text-sm bg-zinc-400 rounded-md py-1 px-3">
              {data.pageView} بازدید
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogBox;
