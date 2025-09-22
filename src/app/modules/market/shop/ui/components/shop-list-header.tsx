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

export const ShopListHeader = () => {
  return (
    <Select value={"NEWEST"} onValueChange={() => {}}>
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
