import { CreateEventSetupView } from "@/app/modules/admin/events/ui/views/create-event-setup-view";
import { BackLink } from "@/components/back-link";
import { ErrorState } from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ eventId: string }>;
}
const EventSetUpPage = async ({ params }: Props) => {
  const { eventId } = await params;
  const queryClient = getQueryClient();
  return (
    <>
      <BackLink href="/admin/events" label="Back to Events" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState />}>
          <ErrorBoundary fallback={<ErrorState />}>
            <CreateEventSetupView eventId={eventId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default EventSetUpPage;
