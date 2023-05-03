import Image from "next/image";
import Link from "next/link";

const CatBox = ({ data }) => {
  return (
    <Link
      href={`/shop?&orderBy=date&maxP=100000000&minP=0&categories=${data.slug}&pgn=12&pn=1`}
    >
      <div className="flex justify-center sm:justify-between items-center bg-gray-200 transition-all duration-200 hover:bg-gray-400 rounded-lg p-2 w-72">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl">{data.title}</h3>
          <p className="text-base sm:text-sm">{data.shortDesc}</p>
        </div>
        <div className="w-16">
          <Image
            className="rounded-md"
            alt={data.imageAlt}
            width={60}
            height={60}
            src={data.image}
            title={data.imageAlt}
            priority={true}
          />
        </div>
      </div>
    </Link>
  );
};

export default CatBox;
