import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorState } from "@/components/error-state";
import { ErrorBoundary } from "react-error-boundary";
import { AdminOverView } from "@/app/modules/admin/ui/views/over-view";
import LoadingState from "@/components/loading-state";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.overView.overView.queryOptions());
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState />}>
          <ErrorBoundary fallback={<ErrorState />}>
            <AdminOverView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
