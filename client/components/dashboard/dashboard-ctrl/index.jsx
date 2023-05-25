"use client";
import { useState } from "react";
import DCBtn from "./btn";

const DashboardCtrl = ({ setContentChanger }) => {
  const [colorChanger, setColorChanger] = useState("admin-pannel");
  return (
    <div className="w-60 flex justify-center items-center h-[100vh]">
      <div className="rounded-lg bg-zinc-200 p-2 flex flex-col justify-around items-center h-[99vh]">
        <DCBtn
          title={"پیشخوان"}
          content={"admin-pannel"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
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
        <DCBtn
          title={"محصولات"}
          content={"products"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"کاربرها"}
          content={"users"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"دیدگاهها"}
          content={"comments"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
        <DCBtn
          title={"سفارشات"}
          content={"payments"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
        />
      </div>
    </div>
  );
};

export default DashboardCtrl;
