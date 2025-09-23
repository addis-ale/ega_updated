"use client";

import { EmptyState } from "@/components/empty-state";
import { Preview } from "@/components/preview";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const BlogsView = () => {
  const trpc = useTRPC();
  const { data: blogs } = useSuspenseQuery(
    trpc.blogPosts.getMany.queryOptions()
  );

  if (!blogs || blogs.length === 0) {
    return (
      <EmptyState
        title="No Blogs Yet"
        description="Once blogs are created, they will appear here."
      />
    );
  }

  return (
    <div className="space-y-6 border-b-2">
      {blogs.map((blog) => (
        <article key={blog.id} className="p-4 shadow-sm bg-card">
          <h2 className="text-xl font-semibold mb-2 text-center">
            {blog.title}
          </h2>
          <div className="text-muted-foreground bg-transparent text-sm leading-relaxed">
            <Preview value={blog.content!} />
          </div>
        </article>
      ))}
    </div>
  );
};
