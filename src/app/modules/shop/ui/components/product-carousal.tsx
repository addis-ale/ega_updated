"use client";
import { formatPriceETB } from "@/lib/utils";
import { Heart, Send } from "lucide-react";
import { DetailSwapCard } from "./product-image-swiper";
import { Button } from "../../../../../components/ui/button";

export const ProductCarousal = () => {
  return (
    <div>
      <DetailSwapCard />
      <div className=" mt-4 flex flex-col gap-4 md:hidden">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 ">
          <div className="flex items-center justify-between max-w-sm gap-2">
            <span>{formatPriceETB(45000)}</span>
            <Button
              size={"lg"}
              className="bg-chart-2 hover:bg-chart-2 text-white"
            >
              Buy
            </Button>
          </div>
          <div className="flex items-center justify-between max-w-sm gap-2">
            <span>
              {formatPriceETB(45000)}/{"week"}
            </span>
            <Button
              size={"lg"}
              className="bg-chart-1 hover:bg-chart-1 text-white"
            >
              Rent
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="flex items-center gap-2 justify-between cursor-pointer border border-muted-foreground px-4 py-2 rounded-xl max-w-[230px]">
            <span>Add to favorite</span>
            <Heart className="text-red-500" />
          </div>
          <div className="flex items-center gap-2 justify-between cursor-pointer border border-muted-foreground px-4 py-2 rounded-xl max-w-[230px]">
            <span>Contact the owner</span>
            <Send className="text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
