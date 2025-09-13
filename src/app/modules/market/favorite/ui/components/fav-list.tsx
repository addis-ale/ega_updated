"use client";
import { ProductCard } from "@/app/modules/market/shop/ui/components/product-card";
export const FavoriteList = () => {
  if (isPending) {
    return (
      <div className="flex items-center justify-center text-xl text-green-500">
        Loading products please wait...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center text-xl text-red-500 h-screen">
        Failed to get the produts please try again...
      </div>
    );
  }
  if (favProducts && favProducts.length === 0)
    return (
      <div className="flex items-center justify-center h-[20vh] text-orange-500">
        No product in your favorite please add some...
      </div>
    );
  return (
    <div>
      {favProducts && favProducts.length > 0 && (
        <div className="grid grid-cols-6 gap-4">
          {favProducts.map((list) => (
            <div key={list.id} className="col-span-3 md:col-span-2 ">
              <ProductCard product={list} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
