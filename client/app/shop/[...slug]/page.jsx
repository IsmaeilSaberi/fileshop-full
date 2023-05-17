import Image from "next/image";
import Link from "next/link";
import BreadCrumb from "../../../components/bread-crumb";
import { TiTickOutline } from "react-icons/ti";
import RelatedPosts from "../../../components/sliders/related-posts";
import SingleProductFavPro from "../../../components/single-product-fav-pro";
import AddToCart from "../../../components/add-to-cart";

const getData = async (slug) => {
  const data = await fetch(
    `https://fileshop-server.iran.liara.run/api/get-product/${slug}`,
    { cache: "no-store" }
  );
  return data.json();
};

const SingleProduct = async ({ params }) => {
  const data = await getData(params.slug);

  //// splitter
  const splitter = (val) => {
    return val.split(":");
  };

  //// MAKE PRICE NUMBER BEAUTIFUL
  function priceChanger(num) {
    // Convert the number to a string
    num = num.toString();
    // Split the string into an array of three-digit chunks
    let chunks = [];
    while (num.length > 0) {
      chunks.push(num.slice(-3));
      num = num.slice(0, -3);
    }
    // Reverse the order of the chunks and join them with commas
    return chunks.reverse().join(",");
  }

  return (
    <div className="container mx-auto flex justify-between items-start gap-4">
      {data.msg ? (
        <div>محصول هنوز منتشر نشده است!</div>
      ) : (
        <>
          <main className="w-[75%]">
            {" "}
            <div className="flex flex-col gap-8">
              <BreadCrumb
                secondTitle={"فروشگاه"}
                secondLink={"/shop"}
                title={data.title}
              />
              <section className="flex justify-center items-center rounded-lg p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]">
                <div className="flex justify-start items-center gap-4 w-full">
                  <div>
                    {" "}
                    <Image
                      className="rounded-xl"
                      alt={data.imageAlt}
                      title={data.imageAlt}
                      width={400}
                      height={200}
                      src={data.image}
                      priority={true}
                    />
                  </div>
                  <div className="flex flex-col h-[12rem] gap-6 w-[60%]">
                    <h1 className="text-lg">{data.title}</h1>
                    <ul className="flex flex-col gap-3 w-[60%]">
                      {data.features.length < 1 ? (
                        <div></div>
                      ) : (
                        data.features.map((fe, i) => (
                          <li
                            key={i}
                            className="flex justify-between items-center"
                          >
                            <div className="flex justify-start items-center gap-1">
                              <TiTickOutline />
                              <span>{splitter(fe)[0]} :</span>
                            </div>
                            <div>{splitter(fe)[1]}</div>
                          </li>
                        ))
                      )}
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
                <p className="leading-9 text-justify">{data.longDesc}</p>
              </section>
              <section>
                <RelatedPosts
                  typeOfModel={data.typeOfProduct}
                  relatedModels={data.relatedProducts}
                  title={"محصولات مرتبط"}
                />
              </section>
              <section className="flex flex-col gap-6">
                <h2 className="text-xl">دیدگاهها</h2>
                <form className="bg-gray-100 rounded-md h-48">1</form>
              </section>
            </div>
          </main>
          <aside className="w-80 max-w-80 p-1 rounded-md bg-zinc-50 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <AddToCart data={data._id} />
              <SingleProductFavPro data={data._id} />
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">معرفی کوتاه</h3>
              <p className=" text-base sm:text-sm text-justify leading-6">
                {data.shortDesc}
              </p>
            </div>
            <div className="rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <ul className="flex flex-col gap-2">
                <li className="flex justify-between items-center">
                  <span>تعداد خرید</span>
                  <span>{data.buyNumber}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>تعداد بازدید</span>
                  <span>{data.pageView}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>تعداد دیدگاه</span>
                  <span>{data.comments ? data.comments.length : 0}</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">دسته بندی ها</h3>
              <div className="flex justify-start items-center gap-2 flex-wrap">
                {data.categories.length < 1 ? (
                  <div className="flex justify-center items-center p-2">
                    بدون دسته بندی
                  </div>
                ) : (
                  data.categories.map((cat, i) => (
                    <Link
                      key={i}
                      className=" p-2 flex justify-start items-center text-base sm:text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 rounded-md"
                      href={`/shop?&orderBy=date&maxP=100000000&minP=0&categories=${cat.slug}&pgn=12&pn=1`}
                    >
                      {cat.title}
                    </Link>
                  ))
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-3 shadow-[0px_0px_8px_rgba(0,0,0,0.35)]">
              <h3 className="text-blue-500">برچسب ها</h3>
              <div className="flex justify-start items-center gap-2 flex-wrap">
                {data.tags.length < 1 ? (
                  <div className="flex justify-center items-center p-2">
                    بدون برچسب
                  </div>
                ) : (
                  data.tags.map((tag, i) => (
                    <Link
                      key={i}
                      className=" p-2 flex justify-start items-center text-base sm:text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 rounded-md"
                      href={`/shop?keyword=${tag}`}
                    >
                      #{tag}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default SingleProduct;
