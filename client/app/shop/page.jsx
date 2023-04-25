import ShopComponent from "../../components/shop-component";

const ShopPage = ({ searchParams }) => {
  return (
    <div className="">
      <ShopComponent url={searchParams} />
    </div>
  );
};

export default ShopPage;
