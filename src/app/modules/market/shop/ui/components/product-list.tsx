"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortBy, sortValueType } from "@/constants";
import { MobileFilter } from "./mobile-filter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ProductCard } from "./product-card";
import { useProductsFilter } from "@/hooks/use-products-filter";
export const ProductList = () => {
  const trpc = useTRPC();
  const [{ search, catIds, minPrice, maxPrice, rentOrSale, sort }, setFilter] =
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
  console.log("ALL_PRODUCTS", productItems);
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="grid grid-cols-6 items-center sticky top-36 z-30 bg-background pt-10 pb-5">
        <div className="col-span-2">
          <Select
            value={sort}
            onValueChange={(value) =>
              setFilter({ sort: value as sortValueType })
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortBy.map((fil) => (
                  <SelectItem
                    key={fil.value}
                    value={fil.value}
                    className="text-sm"
                  >
                    {fil.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="col-start-5 md:col-start-6 col-span-2">
          <div className="md:hidden">
            <MobileFilter />
          </div>
          <span className="text-sm text-muted-foreground hidden md:block">
            {totalItems} Items
          </span>
        </div>
      </div>

      {productItems && productItems.length > 0 && (
        <div className="grid grid-cols-6 gap-4">
          {productItems.map((item) => (
            <div key={item.products.id} className="col-span-3 md:col-span-2 ">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
