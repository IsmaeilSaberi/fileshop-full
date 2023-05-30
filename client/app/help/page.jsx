const Page = () => {
  return (
    <section className="container mx-auto flex justify-center items-center p-12 flex-wrap gap-4">
      <>
        <title>قوانین و ...</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content="قوانین و ..." />
        <link rel="canonical" href="http://localhost:3000/help" />
      </>
      <div className="px-8 py-4 rounded-md bg-orange-500 text-white">
        قوانین سایت
      </div>
      <div className="px-8 py-4 rounded-md bg-orange-500 text-white">
        حریم خصوصی
      </div>
      <div className="px-8 py-4 rounded-md bg-orange-500 text-white">
        سوالات متداول
      </div>
      <div className="px-8 py-4 rounded-md bg-orange-500 text-white">
        چگونه خرید کنم؟
      </div>
    </section>
  );
};

export default Page;
