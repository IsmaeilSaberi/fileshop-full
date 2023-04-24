import ShopComponent from "../../components/shop-component";

const ShopPage = ({ searchParams }) => {
  return (
    <div className="container mx-auto flex justify-between items-start gap-2">
      <aside className="w-80 bg-zinc-100 rounded-lg p-2">aside</aside>
      <main className="w-full bg-zinc-100 rounded-lg p-2 flex flex-col gap-8">
        <h1 className="text-xl text-indigo-600">
          محصولات رمان فروشگاه فایل اسماعیل
        </h1>
        <ShopComponent url={searchParams} />
      </main>
    </div>
  );
};

export default ShopPage;
