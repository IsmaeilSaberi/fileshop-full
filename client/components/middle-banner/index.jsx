import Image from "next/image";

const MiddleBanner = () => {
  return (
    <section className="container mx-auto flex justify-between items-center">
      <Image
        className="rounded-xl"
        alt="alt"
        width={600}
        height={200}
        src="/images/middle-banner/1.jpg"
      />
      <Image
        className="rounded-xl"
        alt="alt"
        width={600}
        height={200}
        src="/images/middle-banner/2.jpg"
      />
    </section>
  );
};

export default MiddleBanner;
