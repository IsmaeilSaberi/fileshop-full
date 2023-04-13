import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const data = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-active-middle-banner",
    { cache: "no-store" }
  );
  return data.json();
};

const MiddleBanner = async () => {
  const data = await getData();
  return (
    <>
      {data.length < 1 ? (
        <div></div>
      ) : (
        <section className="container mx-auto flex justify-between items-center flex-wrap gap-2">
          {data.map((d, i) => (
            <Link key={i} href={d.link}>
              <Image
                className="rounded-xl"
                alt={d.imageAlt}
                title={d.imageAlt}
                width={600}
                height={200}
                src={d.image}
              />
            </Link>
          ))}
        </section>
      )}
    </>
  );
};

export default MiddleBanner;
