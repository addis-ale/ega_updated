"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { EventTitleForm } from "../components/event-title-form";
import { EventDescriptionForm } from "../components/event-description-form";
import { EventLocationForm } from "../components/event-location-form copy";
import { EventCoverImageForm } from "../components/event-cover-img-form";
import { EventDateForm } from "../components/event-date-form";
import { useConfirm } from "@/hooks/use-confirm";
import { ProductActions } from "../../../products/ui/components/product-action";
import { Banner } from "@/components/banner";
import LoadingState from "@/components/loading-state";
import { EventTimeForm } from "../components/event-time-form";

interface Props {
  eventId: string;
}
export const CreateEventSetupView = ({ eventId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: event } = useSuspenseQuery(
    trpc.events.getOne.queryOptions({ eventId })
  );
  const postEvent = useMutation(
    trpc.events.update.mutationOptions({
      onSuccess: async (data) => {
        await Promise.all([
          //TODO: invalidate getMany
          queryClient.invalidateQueries(
            trpc.events.getOne.queryOptions({ eventId })
          ),
        ]);
        if (data.isPosted) {
          toast.success("Event Posted");
        }
        if (!data.isPosted) {
          toast.success("Event not posted");
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const removeEvent = useMutation(
    trpc.events.remove.mutationOptions({
      onSuccess: async () => {
        await Promise.all([
          //TODO: invalidate getMany
          queryClient.invalidateQueries(
            trpc.events.getOne.queryOptions({ eventId })
          ),
        ]);
        toast.success("Event deleted");
        router.push(`/admin/events`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const requiredObj = {
    title: event.title,
    description: event.description,
    coverImg: event.coverImg,
    location: event.location,
    eventDate: event.eventDate,
    eventTime: event.eventTime,
  };
  const requiredFields = Object.values(requiredObj);
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  const initialEventTitleData = {
    title: event.title,
  };
  const initialDesData = {
    description: event.description ?? "",
  };
  const initalLocData = {
    location: event.location ?? "",
  };
  const initialCoverImgData = {
    coverImg: event.coverImg ?? "",
  };
  const initialEventDateData = {
    eventDate: event.eventDate ?? "",
  };
  const initialEventTimeData = {
    eventTime: event.eventTime ?? "",
  };
  const handlePostEvent = (isPosted: boolean) => {
    if (isPosted) {
      postEvent.mutate({
        eventId,
        isPosted: false,
      });
    } else {
      postEvent.mutate({
        eventId,
        isPosted: true,
      });
    }
  };
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this product`
  );
  const handleRemoveEvent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeEvent.mutateAsync({ eventId });
  };
  const isLoading = removeEvent.isPending;
  return (
    <>
      <RemoveConfirmation />
      {!event.isPosted && (
        <Banner
          variant="warning"
          label="This event is not posted yet and won’t be visible to users."
        />
      )}
      <div className="p-6 pb-8">
        {isLoading && (
          <div className="absolute h-[100vh] w-full bg-slate-500/20 runded-md top-0 right-0 flex items-center justify-center">
            <LoadingState />
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2 items-end w-fit">
                <h1 className="text-2xl">Event Setup</h1>
                <p className="text-xs text-muted-foreground">
                  Complete all fields {completionText}
                </p>
              </div>
              <ProductActions
                onPublish={handlePostEvent}
                disabled={!isComplete || isLoading}
                isPosted={event?.isPosted ?? false}
                onRemove={handleRemoveEvent}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-4">
                <EventTitleForm
                  initialData={initialEventTitleData}
                  eventId={eventId}
                />
                <EventDescriptionForm
                  initialData={initialDesData}
                  eventId={eventId}
                />
                <EventLocationForm
                  initialData={initalLocData}
                  eventId={eventId}
                />
                <EventDateForm
                  initialData={initialEventDateData}
                  eventId={eventId}
                />
                <EventTimeForm
                  initialData={initialEventTimeData}
                  eventId={eventId}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <EventCoverImageForm
                  initialData={initialCoverImgData}
                  eventId={eventId}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
