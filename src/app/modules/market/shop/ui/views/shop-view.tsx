"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ProductCard } from "../components/product-card";
import { useProductsFilter } from "@/hooks/use-products-filter";
import { EmptyState } from "@/components/empty-state";
import { authClient } from "@/lib/auth-client";
import { ProductCardGuest } from "../components/product-card-guest";

export const ShopView = () => {
  const { data: session } = authClient.useSession();
  const trpc = useTRPC();
  const [{ search, catIds, minPrice, maxPrice, rentOrSale, sort }] =
    useProductsFilter();
  const { data: products } = useSuspenseQuery(
    trpc.productItems.getMany.queryOptions({
      search,
      categoryIds: catIds,
      minPrice,
      maxPrice,
      type: rentOrSale,
      sort,
    })
  );
  const { items: productItems, totalItems } = products;

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex justify-end">
        <span className="text-sm text-muted-foreground hidden md:block">
          {totalItems} Items
        </span>
      </div>
      {totalItems === 0 && (
        <EmptyState
          title="No products match your filter"
          description="Try resetting your filters to see more products."
        />
      )}

      {productItems && productItems.length > 0 && (
        <div className="grid grid-cols-6 gap-4">
          {productItems.map((item) => (
            <div key={item.products.id} className="col-span-3 md:col-span-2 ">
              {session ? (
                <ProductCard product={item} />
              ) : (
                <ProductCardGuest product={item} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
