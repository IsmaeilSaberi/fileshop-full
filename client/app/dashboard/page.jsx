import MainDashboard from "../../components/dashboard/main-dashboard";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const getAuthData = async (cookieValue) => {
  const goalData = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-user-admin-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );
  const data = await goalData.json();
  if (!data._id) {
    notFound();
  } else {
    return data;
  }
};

const Page = async () => {
  const cookieStore = cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  if (!auth_cookie || auth_cookie.length < 10) {
    notFound();
    // redirect("/");
  }

  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <div>
      <>
        <title>داشبورد مدیریتی</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="داشبورد مدیریتی" />
        <link rel="canonical" href="http://localhost:3000/dashboard" />
      </>
      <div className="container mx-auto flex justify-center items-center">
        <MainDashboard />
      </div>
    </div>
  );
};

export default Page;
