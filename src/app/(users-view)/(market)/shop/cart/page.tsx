// app/(users-view)/(market)/shop/cart/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CartView } from "@/app/modules/market/cart/ui/views/cart-view";
import LoadingState from "@/components/loading-state";
import { getQueryClient, trpc } from "@/trpc/server";
import { ErrorState } from "@/components/error-state";

export const dynamic = "force-dynamic";
const CartPage = async () => {
  const queryClient = getQueryClient();

  // Prefetch cart items for hydration (runs on the server per request)
  void queryClient.prefetchQuery(trpc.cartItems.getMany.queryOptions());

  return (
    <div className="mt-40">
      <h1 className="text-center text-2xl md:text-3xl font-bold">
        Items in Your Cart
      </h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState />}>
          <ErrorBoundary fallback={<ErrorState />}>
            <CartView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default CartPage;
