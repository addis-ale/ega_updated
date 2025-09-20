import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FavoriteView } from "@/app/modules/market/favorite/ui/views/favorite-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LoadingState from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

const FavoritePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.favoriteItems.getMany.queryOptions());
  return (
    <div className="mt-40">
      <h1 className="text-center text-2xl md:text-3xl font-bold">
        Your Favorites Products
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState />}>
          <ErrorBoundary fallback={<ErrorState />}>
            <FavoriteView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default FavoritePage;
