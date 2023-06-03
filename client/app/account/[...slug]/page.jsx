import { cookies } from "next/headers";
import AccountMainComponent from "../../../components/account/account-main";
import Redirect from "../../../components/redirect";

const getAuthData = async (cookieValue) => {
  const goalData = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-user-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );
  const data = await goalData.json();
  if (!data._id) {
    return <Redirect url={"/login"} />;
  } else {
    return data;
  }
};

const AccountPage = async ({ params }) => {
  const cookieStore = cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <section className="container mx-auto flex justify-center items-center">
      <AccountMainComponent items={params} />
    </section>
  );
};

export default AccountPage;
