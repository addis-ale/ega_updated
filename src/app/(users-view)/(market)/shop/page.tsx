import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { loadSearchParams } from "@/app/modules/admin/products/hooks/params";
//import { ProductFilter } from "@/app/modules/market/shop/ui/components/product-filter";
//import { ProductListHeader } from "@/app/modules/market/shop/ui/components/product-list-header";
//import { ShopHero } from "@/app/modules/market/shop/ui/components/shop-hero";
import { ShopView } from "@/app/modules/market/shop/ui/views/shop-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { ShopHero } from "@/app/modules/market/shop/ui/components/shop-hero";
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
        <div className="md:w-2/3">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<p>loading</p>}>
              <ErrorBoundary fallback={<p>error</p>}>
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
