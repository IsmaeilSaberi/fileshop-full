import CartPageComponent from "../../components/cart-page-component";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAuthData = async (cookieValue) => {
  const data = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-user-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );

  return data.json();
};

const CartPage = async ({ params }) => {
  const cookieStore = cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);
  if (!data._id) {
    redirect("/login");
  }

  return (
    <section className="container mx-auto">
      <CartPageComponent items={params} />
    </section>
  );
};

export default CartPage;
