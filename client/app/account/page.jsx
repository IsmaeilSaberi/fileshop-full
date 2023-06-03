// import { redirect } from "next/navigation";
import Redirect from "../../components/redirect";

const AccountPage = () => {
  return <Redirect url={"/account/info"} />;
  // redirect("/account/info");
};

export default AccountPage;
