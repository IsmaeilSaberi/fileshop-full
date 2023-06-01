import Image from "next/image";
import Link from "next/link";
import BreadCrumb from "../../../components/bread-crumb";
import { TiTickOutline } from "react-icons/ti";
import RelatedPosts from "../../../components/sliders/related-posts";
import SingleProductFavPro from "../../../components/single-product-fav-pro";
import AddToCart from "../../../components/add-to-cart";
import CommentsManager from "../../../components/comments-management";
import CommentsNumber from "../../../components/product-post-comments-number";
import { notFound } from "next/navigation";

const getData = async (slug) => {
  const data = await fetch(
    `https://fileshop-server.iran.liara.run/api/get-product/${slug}`,
    { cache: "no-store" }
  );
  const outData = await data.json();
  if (!outData._id && !outData.msg) {
    notFound();
  } else {
    return outData;
  }
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

  const commentProps = { src_id: data._id, typeOfModel: "product" };

  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8 px-2">
      {data.msg ? (
        <div className="w-full flex justify-center items-center p-12 text-xl">
          <div>
            <>
              <title>{data.title}</title>
              <meta name="robots" content="index,follow" />
              <meta name="description" content="انتشار به زودی" />
              <link
                rel="canonical"
                href={`http://localhost:3000/shop/${data.slug}`}
              />
            </>
            محصول هنوز منتشر نشده است!
          </div>
        </div>
      ) : (
        <>
          <>
            <title>{data.title}</title>
            <meta name="robots" content="index,follow" />
            <meta name="description" content={data.shortDesc} />
            <link
              rel="canonical"
              href={`http://localhost:3000/shop/${data.slug}`}
            />
          </>
          <main className="w-full md:w-[60%] lg:w-[75%]">
            <div className="flex flex-col gap-8 mt-4 md:mt-0">
              <BreadCrumb
                secondTitle={"فروشگاه"}
                secondLink={"/shop"}
                title={data.title}
              />
              <section className="flex justify-center items-center rounded-lg p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]">
                <div className="flex justify-start items-center gap-4 w-full flex-col md:flex-row">
                  <div>
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
                  <div className="flex flex-col h-[12rem] gap-6 w-full md:w-[60%]">
                    <h1 className="text-base md:text-lg">{data.title}</h1>
                    <ul className="flex flex-col gap-3 w-full md:w-[60%]">
                      {data.features.length < 1 ? (
                        <div></div>
                      ) : (
                        data.features.map((fe, i) => (
                          <li
                            key={i}
                            className="flex justify-between items-center"
                          >
                            <div className="flex justify-center md:justify-start items-center gap-1">
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
              <section className="flex justify-between items-center gap-2 flex-wrap">
                <div className="flex w-full md:w-[19rem] justify-center transition-all duration-200 hover:bg-slate-200 items-center gap-4 bg-slate-100 p-2 rounded-md">
                  <div className="flex justify-between md:justify-start items-center gap-2">
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
                <div className="flex w-full md:w-[19rem] justify-center transition-all duration-200 hover:bg-slate-200 items-center gap-4 bg-slate-100 p-2 rounded-md">
                  <div className="flex justify-between md:justify-start items-center gap-2">
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
                <div className="flex w-full md:w-[19rem] justify-center transition-all duration-200 hover:bg-slate-200 items-center gap-4 bg-slate-100 p-2 rounded-md">
                  <div className="flex justify-between md:justify-start items-center gap-2">
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
                <p className="leading-7 md:leading-9 text-justify">
                  {data.longDesc}
                </p>
              </section>
              <section>
                <RelatedPosts
                  typeOfModel={data.typeOfProduct}
                  relatedModels={data.relatedProducts}
                  title={"محصولات مرتبط"}
                />
              </section>
              <CommentsManager commentProps={commentProps} />
            </div>
          </main>
          <aside className="w-full md:w-80 md:max-w-80 p-1 rounded-md bg-zinc-50 flex flex-col gap-8 mt-8 md:mt-0">
            <div className="flex flex-col gap-2">
              <div className="fixed bottom-4 left-20 right-20 md:static">
                <AddToCart data={data._id} />
              </div>
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
                  <span>قیمت محصول </span>
                  <span className="text-blue-400 text-base">
                    {priceChanger(data.price)} تومان
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>تعداد خرید</span>
                  <span>{data.buyNumber}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>تعداد بازدید</span>
                  <span>{data.pageView}</span>
                </li>
                <CommentsNumber goalId={data._id} />
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
