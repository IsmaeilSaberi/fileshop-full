"use client";
import { useState } from "react";
import DCBtn from "./btn";

const DashboardCtrl = ({ setContentChanger }) => {
  const [colorChanger, setColorChanger] = useState("middleBanner");
  return (
    <div className="w-60 bg-zinc-200 flex justify-center items-center p-4 rounded-lg">
      <div className="flex flex-col gap-6">
        <DCBtn
          title={"بنرهای تبلیغاتی"}
          content={"middleBanner"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"اسلایدرها"}
          content={"sliders"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"پست ها"}
          content={"posts"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"دسته بندی محصول"}
          content={"categories"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
      </div>
    </div>
  );
};

export default DashboardCtrl;
