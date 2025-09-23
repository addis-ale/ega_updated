"use client";

import { useTRPC } from "@/trpc/client";
import { BlogContentForm } from "../components/blog-form";
import { BlogTitleForm } from "../components/blog-title-form";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Banner } from "@/components/banner";
import { ProductActions } from "../../../products/ui/components/product-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import LoadingState from "@/components/loading-state";

interface Props {
  blogId: string;
}

export const BlogSetUpView = ({ blogId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: blog } = useSuspenseQuery(
    trpc.blogs.getOne.queryOptions({ blogId })
  );
  const publishBlog = useMutation(
    trpc.blogs.update.mutationOptions({
      onSuccess: async (data) => {
        await Promise.all([
          //TODO: invalidate getMany
          queryClient.invalidateQueries(
            trpc.blogs.getOne.queryOptions({ blogId })
          ),
        ]);
        if (data.isPublished) {
          toast.success("Blog Published");
        }
        if (!data.isPublished) {
          toast.success("Blog Unpublished");
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const removeBlog = useMutation(
    trpc.blogs.remove.mutationOptions({
      onSuccess: async () => {
        await Promise.all([
          //TODO: invalidate getMany
          queryClient.invalidateQueries(
            trpc.blogs.getOne.queryOptions({ blogId })
          ),
        ]);
        toast.success("Product deleted");
        router.push(`/admin/blogs`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const initialTitleData = {
    title: blog.title,
  };
  const initialContentData = {
    content: blog.content ?? "",
  };
  const requiredObj = {
    title: blog.title,
    content: blog.content,
  };
  const requiredFields = Object.values(requiredObj);
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  const handlePostBlog = (isPublished: boolean) => {
    if (isPublished) {
      publishBlog.mutate({
        blogId,
        isPublished: false,
      });
    } else {
      publishBlog.mutate({
        blogId,
        isPublished: true,
      });
    }
  };
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this product`
  );
  const handleRemoveBlog = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeBlog.mutateAsync({ blogId });
  };
  const isLoading = removeBlog.isPending;
  return (
    <>
      <RemoveConfirmation />
      {!blog.isPublished && (
        <Banner
          variant="warning"
          label="This blog is not published yet and won’t be visible to users."
        />
      )}
      <div className="w-full max-w-5xl mx-auto p-6">
        {isLoading && (
          <div className="absolute h-[100vh] w-full bg-slate-500/20 runded-md top-0 right-0 flex items-center justify-center">
            <LoadingState />
          </div>
        )}
        {!isLoading && (
          <div className=" rounded-2xl p-8 flex flex-col gap-10">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="border-b pb-4 space-y-2">
                <h1 className="text-2xl font-semibold">Create New Blog</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Fill in the details below to publish your blog post.
                </p>
                <p className="text-xs text-muted-foreground">
                  Complete all fields {completionText}
                </p>
              </div>
              <ProductActions
                onPublish={handlePostBlog}
                disabled={!isComplete || isLoading}
                isPosted={blog?.isPublished ?? false}
                onRemove={handleRemoveBlog}
              />
            </div>

            {/* Forms */}
            <div className="flex flex-col gap-8">
              <BlogTitleForm blogId={blogId} initialData={initialTitleData} />
              <BlogContentForm
                initialData={initialContentData}
                blogId={blogId}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
