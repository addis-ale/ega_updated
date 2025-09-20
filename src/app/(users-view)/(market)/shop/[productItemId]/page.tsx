import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductDetailView } from "@/app/modules/market/shop/ui/views/product-detail-view";
import { getQueryClient, trpc } from "@/trpc/server";
import LoadingState from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

interface Props {
  params: Promise<{ productItemId: string }>;
}

export default async function ProductDetail({ params }: Props) {
  const { productItemId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.productItems.getOne.queryOptions({
      productId: productItemId,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState />}>
        <ErrorBoundary fallback={<ErrorState />}>
          <ProductDetailView productId={productItemId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
