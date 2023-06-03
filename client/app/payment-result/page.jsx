import Redirect from "../../components/redirect";
import PaymentResultComponent from "../../components/payment-result-component";
import { cookies } from "next/headers";

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

const Page = async ({ searchParams }) => {
  const cookieStore = cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <section className="container mx-auto flex justify-center items-center p-12">
      <>
        <title>لطفا صیر کنید</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="لطفا صیر کنید" />
        <link rel="canonical" href="http://localhost:3000/payment-result" />
      </>
      <PaymentResultComponent
        searchParams={searchParams}
        cookie={cookieValue}
      />
    </section>
  );
};

export default Page;
