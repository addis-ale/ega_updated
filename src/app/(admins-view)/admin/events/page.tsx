import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorState } from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { getQueryClient, trpc } from "@/trpc/server";
import { AdminEventsView } from "@/app/modules/admin/events/ui/views/events-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ListHeader } from "@/app/modules/admin/ui/components/list-header";

const EventsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.events.getMany.queryOptions());
  return (
    <>
      <header className="bg-background border-b border-border p-6 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          All Events Events
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage all upcoming, active, and past events from here.
        </p>
      </header>
      <ListHeader label="New Event" href="/admin/events/new" />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState />}>
          <ErrorBoundary fallback={<ErrorState />}>
            <AdminEventsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default EventsPage;
