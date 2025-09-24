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
import { Textarea } from "@/components/ui/textarea";
const eventLocationFormSchema = z.object({
  location: z.string(),
});
interface Props {
  initialData: {
    location: string;
  };
  eventId: string;
}

export const EventLocationForm = ({ initialData, eventId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const form = useForm<z.infer<typeof eventLocationFormSchema>>({
    resolver: zodResolver(eventLocationFormSchema),
    defaultValues: {
      location: initialData?.location ?? "",
    },
  });
  const onSubmit = (data: z.infer<typeof eventLocationFormSchema>) => {
    updateEventLoc.mutate({ ...data, eventId });
  };
  const updateEventLoc = useMutation(
    trpc.events.update.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries get many products
        if (eventId)
          await Promise.all([
            queryClient.invalidateQueries(
              trpc.events.getOne.queryOptions({ eventId })
            ),
          ]);
        setOpenEdit(false);
        toast.success("Event location updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const isLoading = updateEventLoc.isPending;

  return (
    <div className="bg-sidebar-border p-3 ">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">Event Location</h3>
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
              {!!initialData?.location ? (
                <span className="text-muted-foreground text-md">
                  {initialData?.location}
                </span>
              ) : (
                <span className="text-muted-foreground text-md italic">
                  No Location
                </span>
              )}
            </div>
          )}
        </div>
        {openEdit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Location</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white"
                        placeholder="Enter the event location, including the venue name, address, or any details attendees need to find it easily..."
                        {...field}
                      />
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
