"use client";

import { EmptyState } from "@/components/empty-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AdminBlogCard } from "../components/blog-card";

export const AdminBlogsView = () => {
  const trpc = useTRPC();
  const { data: blogs } = useSuspenseQuery(trpc.blogs.getMany.queryOptions());
  if (!blogs || blogs.length === 0) {
    return (
      <EmptyState
        title="No Blogs Yet"
        description="You haven't created any Blogs. Click the button and add your first blog."
      />
    );
  }
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {blogs.map((blog) => (
          <AdminBlogCard key={blog.id} post={blog} />
        ))}
      </div>
    </div>
  );
};
