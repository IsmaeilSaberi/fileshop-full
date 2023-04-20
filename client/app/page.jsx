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
      <main className="flex flex-col gap-2">
        <MainSlider />
        <Slider2
          goalData={data.newApps}
          title="اپلیکیشن ها"
          linkComp="applications"
        />
        <MiddleBanner />
        <Slider2 goalData={data.newBooks} title="کتاب ها" linkComp="books" />
        <Categories />
        <GraphicSlider goalData={data.newGFs} />
        <Blogs />
      </main>
    </div>
  );
};

export default Home;
