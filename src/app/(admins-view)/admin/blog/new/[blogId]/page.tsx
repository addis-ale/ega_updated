import { BlogSetUpView } from "@/app/modules/admin/blogs/ui/views/blog-setup-view";
import { ErrorState } from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{ blogId: string }>;
}

const BlogSetupPage = async ({ params }: PageProps) => {
  const { blogId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.blogs.getOne.queryOptions({ blogId }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState />}>
        <ErrorBoundary fallback={<ErrorState />}>
          <BlogSetUpView blogId={blogId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default BlogSetupPage;
