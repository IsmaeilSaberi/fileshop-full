import ShopComponent from "../../components/shop-component";

const ShopPage = ({ searchParams }) => {
  return (
    <div className="">
      <>
        <title>فروشگاه</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content="فروشگاه" />
        <link rel="canonical" href="http://localhost:3000/shop" />
      </>
      <ShopComponent url={searchParams} />
    </div>
  );
};

export default ShopPage;
