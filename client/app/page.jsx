import Slider2 from "../components/sliders/mainSlider/slider2";
import MiddleBanner from "../components/middle-banner";
import Categories from "../components/categories";
import GraphicSlider from "../components/sliders/graphic-slider";
import Blogs from "../components/blogs";
import MainSlider from "../components/sliders/mainSlider";

const Home = () => {
  return (
    <div>
      <main className="flex flex-col gap-2">
        <MainSlider />
        <Slider2 title="دانلودها" linkComp="downloads" />
        <MiddleBanner />
        <Slider2 title="محصولات" linkComp="products" />
        <Categories />
        <GraphicSlider />
        <Blogs />
      </main>
    </div>
  );
};

export default Home;
