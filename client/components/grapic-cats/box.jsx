import Image from "next/image";
import Link from "next/link";

const CatBox = () => {
  return (
    <Link href={""}>
      <div className="flex justify-center sm:justify-between items-center bg-gray-100 transition-all duration-200 hover:bg-gray-300 rounded-lg p-2 w-72">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl">فایل لایه باز فوتوشاپ</h3>
          <p className="text-base sm:text-sm">وکتورهای گرافیکی قدرتمند</p>
        </div>
        <div className="w-16">
          <Image
            alt="alt"
            width={60}
            height={60}
            src="/images/categories/calculator-min.png"
          />
        </div>
      </div>
    </Link>
  );
};

export default CatBox;
