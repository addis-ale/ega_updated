"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { PenIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { formatTime12Hour } from "@/lib/format-12hr-time";

const eventTimeFormSchema = z.object({
  eventTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format. Use HH:MM (24-hour).",
  }),
});

interface Props {
  initialData: {
    eventTime: string;
  };
  eventId: string;
}

export const EventTimeForm = ({ initialData, eventId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);

  const form = useForm<z.infer<typeof eventTimeFormSchema>>({
    resolver: zodResolver(eventTimeFormSchema),
    defaultValues: {
      eventTime: initialData?.eventTime ?? "",
    },
  });

  const onSubmit = (data: z.infer<typeof eventTimeFormSchema>) => {
    // const time = data.toISOString();
    updateEventTime.mutate({ ...data, eventId });
  };

  const updateEventTime = useMutation(
    trpc.events.update.mutationOptions({
      onSuccess: async () => {
        if (eventId)
          await Promise.all([
            queryClient.invalidateQueries(
              trpc.events.getOne.queryOptions({ eventId })
            ),
          ]);
        setOpenEdit(false);
        toast.success("Event time updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const isLoading = updateEventTime.isPending;

  return (
    <div className="bg-sidebar-border p-3 ">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">Event Time</h3>
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
              {!!initialData?.eventTime ? (
                <span className="text-muted-foreground text-md">
                  {formatTime12Hour(initialData?.eventTime)}
                </span>
              ) : (
                <span className="text-muted-foreground text-md italic">
                  No Time Set
                </span>
              )}
            </div>
          )}
        </div>
        {openEdit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="eventTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Time</FormLabel>
                    <FormControl>
                      <Input type="time" className="bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                Save
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};
