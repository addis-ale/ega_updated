"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import ProductFilter from "./ProductFilter";

const MobileFilter = () => {
  return (
    <div className="md:hidden w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <FilterIcon className="w-4 h-4" />
            Filters
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[85%] sm:w-[70%] overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">
              Filter Products
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4">
            <ProductFilter />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilter;
