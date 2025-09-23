"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PenIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { useTRPC } from "@/trpc/client";
const blogForm = z.object({
  content: z.string(),
});
interface Props {
  initialData?: {
    content: string;
  };
  blogId: string;
}

export const BlogContentForm = ({ initialData, blogId }: Props) => {
  console.log("INITIAL_DATA", initialData);
  const [openEdit, setOpenEdit] = useState(false);
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const form = useForm<z.infer<typeof blogForm>>({
    resolver: zodResolver(blogForm),
    defaultValues: {
      content: initialData?.content ?? "",
    },
  });
  const toggleEdit = () => {
    setOpenEdit((prev) => !prev);
  };
  const onSubmit = (data: z.infer<typeof blogForm>) => {
    updateBlog.mutate({ ...data, blogId });
  };
  const updateBlog = useMutation(
    trpc.blogs.update.mutationOptions({
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries(
            trpc.blogs.getOne.queryOptions({ blogId })
          ),
          //TODO: invalidate queries get many blogs
          // queryClient.invalidateQueries(
          //   trpc.chapters.getMany.queryOptions({ courseId })
          // ),
        ]);
        setOpenEdit(false);
        toast.success("Blog content updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  return (
    <div className="p-3 bg-sidebar-border ">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">Blog Content</h3>
            <Button
              disabled={updateBlog.isPending}
              variant={"outline"}
              onClick={toggleEdit}
            >
              {openEdit ? (
                <>Cancel</>
              ) : (
                <>
                  <PenIcon className="size-5" /> Edit
                </>
              )}
            </Button>
          </div>
          {!openEdit && (
            <div>
              {!!initialData?.content ? (
                <span className="text-muted-foreground text-md">
                  <Preview value={initialData?.content} />
                </span>
              ) : (
                <span className="text-muted-foreground text-md italic">
                  No Content
                </span>
              )}
            </div>
          )}
        </div>
        {openEdit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={updateBlog.isPending} type="submit">
                Save
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};
