import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { loadSearchParams } from "@/app/modules/admin/products/hooks/params";
import { ProductFilter } from "@/app/modules/market/shop/ui/components/product-filter";
import { ProductListHeader } from "@/app/modules/market/shop/ui/components/product-list-header";
import { ShopHero } from "@/app/modules/market/shop/ui/components/shop-hero";
import { ShopView } from "@/app/modules/market/shop/ui/views/shop-view";
import { ErrorState } from "@/components/error-state";
import LoadingState from "@/components/loading-state";
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
      <ShopHero />
      <div className="flex md:w-full justify-between mt-8 md:mt-12">
        <div className="md:w-1/3 hidden md:block mr-2">
          <ProductFilter />
        </div>
        <div className="md:w-2/3">
          <ProductListHeader />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState />}>
              <ErrorBoundary fallback={<ErrorState />}>
                <ShopView />
              </ErrorBoundary>
            </Suspense>
          </HydrationBoundary>
        </div>
      </div>
      {/* list */}
    </>
  );
};

export default ShopPage;
