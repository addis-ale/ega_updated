"use client";

import { BlogTitleForm } from "../components/blog-title-form";

export const CreateNewBlogView = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto mt-8 h-[50vh]">
      <div className="h-full w-full flex flex-col gap-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Create a New Blog</h1>
          <p className="text-sm text-muted-foreground">
            Enter a title for your blog post to get started.
          </p>
        </div>
        <BlogTitleForm />
      </div>
    </div>
  );
};
