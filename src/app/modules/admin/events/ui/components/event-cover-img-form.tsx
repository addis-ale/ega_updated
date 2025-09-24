"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { EditIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
type eventCoverImgFormSchema = {
  coverImg: string;
};
interface Props {
  initialData: {
    coverImg: string;
  };
  eventId: string;
}

export const EventCoverImageForm = ({ initialData, eventId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const onSubmit = (data: eventCoverImgFormSchema) => {
    updateCoverImg.mutate({
      coverImg: data.coverImg,
      eventId,
    });
  };

  const updateCoverImg = useMutation(
    trpc.events.update.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries get many courses
        if (eventId)
          await Promise.all([
            // queryClient.invalidateQueries(
            //   trpc.courses.getOne.queryOptions({ id: courseId })
            // ),

            queryClient.invalidateQueries(
              trpc.events.getOne.queryOptions({ eventId })
            ),
          ]);
        setOpenEdit(false);
        toast.success("Event cover image updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const isLoading = updateCoverImg.isPending;
  return (
    <div className="bg-sidebar-border p-3 ">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">Event Cover Image</h3>
            {openEdit && (
              <Button
                variant={"outline"}
                onClick={() => setOpenEdit(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}

            {!openEdit && (
              <Button
                className=""
                variant={"outline"}
                onClick={() => setOpenEdit(true)}
                disabled={isLoading}
              >
                <EditIcon className="size-5" /> Edit
              </Button>
            )}
          </div>
          {!openEdit && (
            <div>
              {initialData?.coverImg ? (
                <div className="relative aspect-video mt-2">
                  <Image
                    src={initialData?.coverImg}
                    alt="uploaded image"
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <ImageIcon className="h-10 w-10 text-slate-500" />
                  </div>
                  <span className="text-xs text-center text-destructive mx-auto">
                    Please insert the event cover image!
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        {openEdit && (
          <div className="">
            <FileUpload
              endpoint="eventCoverImage"
              onChange={(url) => {
                if (url) {
                  onSubmit({ coverImg: url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4 text-center">
              Upload event cover image.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
