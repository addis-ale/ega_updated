import { headers } from "next/headers";
import { redirect } from "next/navigation";
//import { CheckoutSuccessView } from "@/app/modules/market/cart/ui/views/checkout-success-view";
import { auth } from "@/lib/auth";

const SuccessPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  // return <CheckoutSuccessView />;
  return <div>checkout </div>;
};

export default SuccessPage;
