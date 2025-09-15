"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ProductCard } from "../../../shop/ui/components/product-card";
import { EmptyState } from "@/components/empty-state";

export const FavoriteView = () => {
  const trpc = useTRPC();
  const { data: favoriteItems } = useSuspenseQuery(
    trpc.favoriteItems.getMany.queryOptions()
  );
  return (
    <div className="mt-8">
      <div className="flex flex-col gap-8">
        {favoriteItems && favoriteItems.length > 0 && (
          <div className="grid grid-cols-6 gap-4">
            {favoriteItems.map((list) => (
              <div key={list.products.id} className="col-span-3 md:col-span-2 ">
                <ProductCard product={list} />
              </div>
            ))}
          </div>
        )}
        {favoriteItems.length === 0 && (
          <EmptyState
            title="No Favorites Yet"
            description="You haven't added any products to your favorites. Start exploring and tap the heart icon to save your favorite items!"
          />
        )}
      </div>
    </div>
  );
};
