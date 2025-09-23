import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { BlogsView } from "@/app/modules/blog/ui/views/blogs-view";
import { ErrorState } from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { getQueryClient, trpc } from "@/trpc/server";

const BlogsPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.blogPosts.getMany.queryOptions());

  return (
    <div className="flex flex-col  mt-24">
      {/* Static Header */}
      <header className="sticky top-0 z-10 bg-background border-b p-4 text-center">
        <h1 className="text-2xl font-semibold">All Blogs</h1>
        <p className="text-sm text-muted-foreground">
          Browse through all available posts
        </p>
      </header>

      {/* Scrollable Content */}
      <main className="">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<LoadingState />}>
            <ErrorBoundary fallback={<ErrorState />}>
              <BlogsView />
            </ErrorBoundary>
          </Suspense>
        </HydrationBoundary>
      </main>
    </div>
  );
};

export default BlogsPage;
