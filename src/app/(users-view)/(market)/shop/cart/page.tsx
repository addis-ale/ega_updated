import { CartView } from "@/app/modules/market/cart/ui/views/cart-view";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const CartPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.cartItems.getMany.queryOptions());
  return (
    <div className="mt-40">
      <h1 className="text-center text-2xl md:text-3xl font-bold">
        Items in Your Cart
      </h1>{" "}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>loading</p>}>
          <ErrorBoundary fallback={<p>Error</p>}>
            <CartView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default CartPage;
