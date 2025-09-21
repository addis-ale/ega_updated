import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { CartView } from "@/app/modules/market/cart/ui/views/cart-view";
import { ErrorState } from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState />}>
        <ErrorBoundary fallback={<ErrorState />}>
          <div>cart page</div>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default CartPage;
