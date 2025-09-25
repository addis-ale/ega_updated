"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { PenIcon } from "lucide-react";
import { EventDatePicker } from "./event-date-picker";
import { format } from "date-fns";

interface Props {
  initialData: {
    eventDate: string;
  };
  eventId: string;
}

export const EventDateForm = ({ initialData, eventId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const onSubmit = (data: Date) => {
    const date = data.toISOString();
    updateEventdate.mutate({
      eventDate: date,
      eventId,
    });
  };

  const updateEventdate = useMutation(
    trpc.events.update.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries get many courses
        if (eventId)
          await Promise.all([
            queryClient.invalidateQueries(
              trpc.events.getOne.queryOptions({ eventId })
            ),
          ]);
        setOpenEdit(false);
        toast.success("Event date updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const isLoading = updateEventdate.isPending;
  return (
    <div className="bg-sidebar-border p-3 ">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">Event Date</h3>
            {openEdit ? (
              <Button
                variant={"outline"}
                onClick={() => setOpenEdit(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            ) : (
              <Button
                className=""
                variant={"outline"}
                onClick={() => setOpenEdit(true)}
                disabled={isLoading}
              >
                <PenIcon className="size-5" /> Edit
              </Button>
            )}
          </div>
          {!openEdit && (
            <div>
              {!!initialData?.eventDate ? (
                <span className="text-muted-foreground text-md">
                  {format(new Date(initialData?.eventDate), "MMMM dd, yyyy")}
                </span>
              ) : (
                <span className="text-muted-foreground text-md italic">
                  No date set
                </span>
              )}
            </div>
          )}
        </div>
        {openEdit && (
          <div className="">
            <EventDatePicker onSubmit={onSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};
