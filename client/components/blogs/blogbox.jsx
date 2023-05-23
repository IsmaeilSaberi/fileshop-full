import Image from "next/image";
import Link from "next/link";

const BlogBox = ({ data }) => {
  return (
    <article className="sliderItem p-2 transition-all duration-200 hover:-translate-y-2">
      <div className="relative h-[26rem] w-72 bg-white rounded-md shadow-[0px_1px_10px_rgba(0,0,0,0.25)] hover:shadow-[0px_2px_10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-center p-1">
          <Link href={`/blog/${data.slug}`} target="_blank">
            <Image
              className="p-2"
              alt={data.imageAlt}
              title={data.imageAlt}
              width={288}
              height={120}
              src={data.image}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-2 ">
          <Link href={`/blog/${data.slug}`} target="_blank">
            <h3 className="m-2 line-clamp-2">{data.title}</h3>
          </Link>
          <p className="text-base sm:text-sm text-justify m-2 line-clamp-4">
            {data.shortDesc}
          </p>
          <div className="h-1 w-[90%] absolute left-2 right-2 bottom-12 mx-auto bg-zinc-300"></div>
          <div className="flex justify-between items-center m-1 absolute bottom-2 right-2 left-2">
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
