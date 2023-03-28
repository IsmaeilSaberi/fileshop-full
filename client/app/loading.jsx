import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center p-12">
      <Image alt="loading" width={120} height={120} src={"/loading.svg"} />
    </div>
  );
};

export default Loading;
