"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EventTitleForm } from "../components/event-title-form";
import { EventDescriptionForm } from "../components/event-description-form";

interface Props {
  eventId: string;
}
export const CreateEventSetupView = ({ eventId }: Props) => {
  const trpc = useTRPC();
  const { data: event } = useSuspenseQuery(
    trpc.events.getOne.queryOptions({ eventId })
  );
  const requiredObj = {
    title: event.title,
    description: event.description,
    coverImg: event.coverImg,
    location: event.location,
    eventDate: event.eventDate,
  };
  const requiredFields = Object.values(requiredObj);
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const initialEventTitleData = {
    title: event.title,
  };
  const initialDesData = {
    description: event.description ?? "",
  };
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 items-end w-fit">
          <h1 className="text-2xl">Event Setup</h1>
          <p className="text-xs text-muted-foreground">
            Complete all fields {completionText}
          </p>
        </div>
        {/* <ProductActions
          onPublish={handlePostProduct}
          disabled={!isComplete || isLoading}
          isPosted={product?.isPosted ?? false}
          onRemove={handleRemoveProduct}
        /> */}
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
        </div>
        <div className="flex flex-col space-y-4">right</div>
      </div>
    </div>
  );
};
