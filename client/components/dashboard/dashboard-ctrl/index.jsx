import DCBtn from "../btn";

const DashboardCtrl = ({ setContentChanger }) => {
  return (
    <div className="w-60 bg-zinc-200 flex justify-center items-center p-4">
      <div className="flex flex-col gap-6">
        <DCBtn
          title={"بنرهای تبلیغاتی"}
          content={"middleBanner"}
          setContentChanger={setContentChanger}
        />
        <DCBtn
          title={"اسلایدرها"}
          content={"sliders"}
          setContentChanger={setContentChanger}
        />
      </div>
    </div>
  );
};

export default DashboardCtrl;
