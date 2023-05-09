import { cache } from "react";
import AccountMainComponent from "../../components/account/accountMain";

const getData = async () => {
  const data = await fetch("", { cache: "nostore" });
  return data.json();
};

const AccountPage = async () => {
  const data = await getData(``);
  return (
    <section className="container mx-auto flex justify-center items-center p-12">
      <div className="px-8 py-4 rounded-md bg-orange-500 text-white">
        حساب کاربری
      </div>
      <AccountMainComponent />
    </section>
  );
};

export default AccountPage;
