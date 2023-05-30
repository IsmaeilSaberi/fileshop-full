import CartPageComponent from "../../components/cart-page-component";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAuthData = async (cookieValue) => {
  const goalData = await fetch(
    "https://fileshop-server.iran.liara.run/api/get-user-data",
    { cache: "no-store", headers: { auth_cookie: cookieValue } }
  );
  const data = await goalData.json();
  if (!data._id) {
    redirect("/login");
  } else {
    return data;
  }
};

const CartPage = async () => {
  const cookieStore = cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <main className="container mx-auto">
      <>
        <title>سبد خرید</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content="سبد خرید" />
        <link rel="canonical" href="http://localhost:3000/cart" />
      </>
      <CartPageComponent cookie={cookieValue} />
    </main>
  );
};

export default CartPage;
