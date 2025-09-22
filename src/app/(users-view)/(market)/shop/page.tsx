import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadSearchParams } from "@/app/modules/admin/products/hooks/params";
import { ShopView } from "@/app/modules/market/shop/ui/views/shop-view";

import { getQueryClient, trpc } from "@/trpc/server";
type PageProps = {
  searchParams: Promise<SearchParams>;
};
const ShopPage = async ({ searchParams }: PageProps) => {
  const { search, catIds, minPrice, maxPrice, rentOrSale, sort } =
    await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.productItems.getMany.queryOptions({
      search,
      categoryIds: catIds,
      minPrice,
      maxPrice,
      type: rentOrSale,
      sort,
    })
  );
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading</p>}>
          <ErrorBoundary fallback={<p>error</p>}>
            <ShopView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default ShopPage;
