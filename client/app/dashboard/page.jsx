import MainDashboard from "../../components/dashboard/main-dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const getAuthData = async (cookieValue) => {
  const goalData = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-user-admin-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );
  const data = await goalData.json();
  if (!data._id) {
    notFound();
    // redirect("/");
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
      <MainDashboard />
    </div>
  );
};

export default Page;
