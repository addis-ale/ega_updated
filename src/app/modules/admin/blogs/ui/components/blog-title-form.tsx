"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { PenIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string(),
});

interface Props {
  initialData?: {
    title: string;
  };
  blogId?: string;
}

export const BlogTitleForm = ({ initialData, blogId }: Props) => {
  const isEdit = !!initialData && !!blogId;
  const [openEdit, setOpenEdit] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const trpc = useTRPC();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isEdit) {
      updateBlog.mutate({ title: data.title, blogId });
    } else {
      createNewBlog.mutate(data);
    }
  };
  const createNewBlog = useMutation(
    trpc.blogs.create.mutationOptions({
      onSuccess: async (data) => {
        //TODO: invalidate queries for getMany

        toast.success("New Blog Created!");
        setOpenEdit(false);
        router.push(`/admin/blog/new/${data.id}`);
      },
      onError: (error) => {
        toast.message(error.message);
      },
    })
  );
  const updateBlog = useMutation(
    trpc.blogs.update.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate get many blogs
        if (blogId)
          await Promise.all([
            queryClient.invalidateQueries(
              trpc.blogs.getOne.queryOptions({ blogId })
            ),
          ]);
        toast.success("Blog title updated!");
        setOpenEdit(false);
      },
      onError: (error) => {
        toast.message(error.message);
      },
    })
  );
  const isLoading = createNewBlog.isPending || updateBlog.isPending;
  if (isEdit) {
    return (
      <div className="bg-sidebar-border p-3 ">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-md">Blog Title</h3>
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
                      <FormLabel>Blog Title</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="text"
                          placeholder="e.g. Top 5 Family Board Games Everyone Should Own"
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
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. Top 5 Family Board Games Everyone Should Own"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="leading-relaxed">
                  Give your blog post a clear and engaging title. This will help
                  readers quickly understand what it’s about.
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
              <Link href={"/admin/blogs"}>Cancel</Link>
            </Button>

            <Button disabled={isLoading} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    );
};
