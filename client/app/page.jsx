import Slider2 from "../components/sliders/mainSlider/slider2";
import MiddleBanner from "../components/middle-banner";
import Categories from "../components/categories";
import GraphicSlider from "../components/sliders/graphic-slider";
import Blogs from "../components/blogs";
import MainSlider from "../components/sliders/mainSlider";

const getproductsData = async () => {
  const data = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-new-products",
    { cache: "no-store" }
  );
  return data.json();
};

const Home = async () => {
  const data = await getproductsData();
  return (
    <div>
      <>
        <title>فروشگاه فایل اسماعیل</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content=" فروشگاه فایل اسماعیل" />
        <meta name="keywords" content=" فروشگاه فایل اسماعیل" />
        <link rel="canonical" href="http://localhost:3000/" />
      </>
      <main className="flex flex-col gap-2">
        <MainSlider />
        <Slider2 goalData={data.newApps} title="اپلیکیشن ها" linkComp="app" />
        <MiddleBanner />
        <Slider2 goalData={data.newBooks} title="کتاب ها" linkComp="book" />
        <Categories />
        <GraphicSlider goalData={data.newGFs} />
        <Blogs />
      </main>
    </div>
  );
};

export default Home;
