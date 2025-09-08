import { CreateNewProductSetupView } from "@/app/modules/admin/products/ui/views/create-new-product-setup-view";
import { BackLink } from "@/components/back-link";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
interface Props {
  params: Promise<{ productId: string }>;
}

const Page = async ({ params }: Props) => {
  const { productId } = await params;
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(
      trpc.products.getOne.queryOptions({
        productId,
      })
    ),
    queryClient.prefetchQuery(
      trpc.productImages.getMany.queryOptions({
        productId,
      })
    ),
    queryClient.prefetchQuery(trpc.productCategories.getMany.queryOptions()),
  ]);
  return (
    <>
      <BackLink href="/admin/products" label="Back to Products" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading</p>}>
          <ErrorBoundary fallback={<p>error</p>}>
            <CreateNewProductSetupView productId={productId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
