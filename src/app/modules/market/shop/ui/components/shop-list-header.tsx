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
import { useProductsFilter } from "@/hooks/use-products-filter";

export const ShopListHeader = () => {
  const [{ sort }, setFilter] = useProductsFilter();
  return (
    <Select
      value={sort}
      onValueChange={(value) => setFilter({ sort: value as sortValueType })}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by:" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortBy.map((fil) => (
            <SelectItem key={fil.value} value={fil.value} className="text-sm">
              {fil.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
