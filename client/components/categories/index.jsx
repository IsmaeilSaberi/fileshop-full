const getData = async () => {
  const data = await fetch(
    `https://fileshop-server.iran.liara.run/api/get-active-categories`,
    {
      cache: "no-store",
    }
  );
  return data.json();
};

import CatBox from "./box";

const Categories = async () => {
  const data = await getData();
  return (
    <>
      {data.length < 1 ? (
        <div></div>
      ) : (
        <section className="container mx-auto flex justify-center md:justify-between items-center gap-2 flex-wrap">
          {data.map((da, i) => (
            <CatBox key={i} data={da} />
          ))}
        </section>
      )}
    </>
  );
};

export default Categories;
