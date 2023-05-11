import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountMainComponent from "../../../components/account/accountMain";

const getAuthData = async (cookieValue) => {
  const data = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-user-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );

  return data.json();
};

const AccountPage = async ({ params }) => {
  const cookieStore = cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);
  if (!data._id) {
    redirect("/login");
  }

  return (
    <section className="container mx-auto flex justify-center items-center">
      <AccountMainComponent items={params} />
    </section>
  );
};

export default AccountPage;
