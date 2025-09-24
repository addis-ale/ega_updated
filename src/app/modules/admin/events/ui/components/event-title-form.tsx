"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useState } from "react";
import { PenIcon } from "lucide-react";
const eventTitleFormSchema = z.object({
  title: z.string(),
});
interface Props {
  initialData?: {
    title: string;
  };
  eventId?: string;
}
export const EventTitleForm = ({ initialData, eventId }: Props) => {
  const isEdit = !!initialData && !!eventId;
  const [openEdit, setOpenEdit] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof eventTitleFormSchema>>({
    resolver: zodResolver(eventTitleFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
    },
  });
  const createEvent = useMutation(
    trpc.events.create.mutationOptions({
      onSuccess: async (data) => {
        // TODO: invalidate some queries get Many
        toast.success("Event title created!");
        router.push(`/admin/events/new/${data.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateEvent = useMutation(
    trpc.events.update.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries getMany and get one
        // if (eventId) {
        //   await queryClient.invalidateQueries(
        //     trpc.products.getOne.queryOptions({
        //       eventId,
        //     })
        //   );
        // }
        toast.success("Event Title Updated!");
        setOpenEdit(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const isLoading = createEvent.isPending || updateEvent.isPending;
  const onSubmit = (data: z.infer<typeof eventTitleFormSchema>) => {
    if (isEdit) {
      updateEvent.mutate({
        title: data.title,
        eventId,
      });
    } else
      createEvent.mutate({
        title: data.title,
      });
  };
  if (isEdit) {
    return (
      <div className="bg-sidebar-border p-3 ">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-md">Event Title</h3>
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
              <span className="text-muted-foreground text-md">
                {initialData.title}
              </span>
            )}
          </div>
          {openEdit && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="text"
                          placeholder="e.g. Summer Gaming Expo 2025"
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
  } else
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col space-y-8 max-w-xl"
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-4">
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. Summer Gaming Expo 2025"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="leading-relaxed">
                  Give your event a clear and recognizable title. This will help
                  attendees quickly understand what the event is about and make
                  it easier to find.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-x-4 items-center">
            <Button
              disabled={isLoading}
              asChild
              type="button"
              variant={"ghost"}
            >
              <Link href={"/admin/events"}>Cancel</Link>
            </Button>

            <Button disabled={isLoading} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    );
};
