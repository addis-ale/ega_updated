"use client";

import { useTRPC } from "@/trpc/client";
import { BlogContentForm } from "../components/blog-form";
import { BlogTitleForm } from "../components/blog-title-form";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  blogId: string;
}

export const BlogSetUpView = ({ blogId }: Props) => {
  const trpc = useTRPC();
  const { data: blog } = useSuspenseQuery(
    trpc.blogs.getOne.queryOptions({ blogId })
  );
  const initialTitleData = {
    title: blog.title,
  };
  const initialContentData = {
    content: blog.content ?? "",
  };
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className=" rounded-2xl p-8 flex flex-col gap-10">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-semibold">Create New Blog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Fill in the details below to publish your blog post.
          </p>
        </div>

        {/* Forms */}
        <div className="flex flex-col gap-8">
          <BlogTitleForm blogId={blogId} initialData={initialTitleData} />
          <BlogContentForm initialData={initialContentData} blogId={blogId} />
        </div>
      </div>
    </div>
  );
};
