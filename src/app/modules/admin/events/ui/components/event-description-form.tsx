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
const eventDescriptionFormSchema = z.object({
  description: z.string(),
});
interface Props {
  initialData: {
    description: string;
  };
  eventId: string;
}

export const EventDescriptionForm = ({ initialData, eventId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const form = useForm<z.infer<typeof eventDescriptionFormSchema>>({
    resolver: zodResolver(eventDescriptionFormSchema),
    defaultValues: {
      description: initialData?.description ?? "",
    },
  });
  const onSubmit = (data: z.infer<typeof eventDescriptionFormSchema>) => {
    updateEventDesc.mutate({ ...data, eventId });
  };
  const updateEventDesc = useMutation(
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
        toast.success("Event description updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const isLoading = updateEventDesc.isPending;

  return (
    <div className="bg-sidebar-border p-3 ">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">Event Description</h3>
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
              {!!initialData?.description ? (
                <span className="text-muted-foreground text-md">
                  {initialData?.description}
                </span>
              ) : (
                <span className="text-muted-foreground text-md italic">
                  No Description
                </span>
              )}
            </div>
          )}
        </div>
        {openEdit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white"
                        placeholder="Write a clear and engaging description of your event, including the schedule, activities, speakers, and any other important details attendees should know..."
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
