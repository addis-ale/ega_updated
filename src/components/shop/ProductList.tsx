"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortBy } from "@/constants";
import ProductCard from "./ProductCard";
import MobileFilter from "./MobileFilter";
import { useProducts } from "@/hooks/useProducts";
const ProductList = () => {
  const { data: getProducts, isPending, isError } = useProducts();
  const productLists = getProducts?.products;
  if (isPending) {
    return (
      <div className="flex items-center justify-center text-xl text-green-500">
        Loading the products please wait...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center text-xl text-red-500 ">
        Failed to get the produts please try again...
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="grid grid-cols-6 items-center sticky top-36 z-30 bg-background pt-10 pb-5">
        <div className="col-span-2">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortBy.map((sort) => (
                  <SelectItem
                    key={sort.value}
                    value={sort.value}
                    className="text-sm"
                  >
                    {sort.label}
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
            245 Items
          </span>
        </div>
      </div>

      {productLists && productLists.length > 0 && (
        <div className="grid grid-cols-6 gap-4">
          {productLists.map((list) => (
            <div key={list.id} className="col-span-3 md:col-span-2 ">
              <ProductCard product={list} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductList;
