import { AdminBlogsView } from "@/app/modules/admin/blogs/ui/views/admin-blog-view";
import { ListHeader } from "@/app/modules/admin/ui/components/list-header";
import { ErrorState } from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const BlogPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.blogs.getMany.queryOptions());
  return (
    <>
      <header className="bg-background border-b border-border p-6 text-center">
        <h1 className="text-3xl font-bold text-foreground">All Blogs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage all published, draft, and archived blog posts from here.
        </p>
      </header>
      <ListHeader label="New Blog" href="/admin/blogs/new" />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState />}>
          <ErrorBoundary fallback={<ErrorState />}>
            <AdminBlogsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default BlogPage;
