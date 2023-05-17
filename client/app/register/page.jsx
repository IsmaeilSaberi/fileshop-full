import RegisterForm from "../../components/auth/registerForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAuthData = async (cookieValue) => {
  const goalData = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-user-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );
  const data = await goalData.json();
  if (data._id) {
    redirect("/account");
  } else {
    return data;
  }
};

const Register = async () => {
  const cookieStore = cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
