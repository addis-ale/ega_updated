"use client";
import { Heart, Send } from "lucide-react";
import { formatPriceETB } from "@/lib/utils";
import { DetailSwapCard } from "./product-image-swiper";
import { Button } from "@/components/ui/button";

interface Props {
  sellingPrice?: number;
  rentalPrice?: number;
  images: {
    url: string;
    alt: string;
  }[];
}
export const ProductCarousal = ({
  sellingPrice,
  rentalPrice,
  images,
}: Props) => {
  return (
    <div>
      <DetailSwapCard data={{ images: images! }} />
      <div className=" mt-4 flex flex-col gap-4 md:hidden">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 ">
          {sellingPrice && (
            <div className="flex items-center justify-between max-w-sm gap-2">
              <span>{formatPriceETB(sellingPrice)}</span>
              <Button
                size={"lg"}
                className="bg-chart-2 hover:bg-chart-2 text-white"
              >
                Buy
              </Button>
            </div>
          )}
          {rentalPrice && (
            <div className="flex items-center justify-between max-w-sm gap-2">
              <span>
                {formatPriceETB(rentalPrice)}/{"day"}
              </span>
              <Button
                size={"lg"}
                className="bg-chart-1 hover:bg-chart-1 text-white"
              >
                Rent
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="flex items-center gap-2 justify-between cursor-pointer border border-muted-foreground px-4 py-2 rounded-xl max-w-[230px]">
            <span>Add to favorite</span>
            <Heart className="text-red-500" />
          </div>
          <a
            href={`https://t.me/${process.env.NEXT_PUBLIC_ADMIN_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-between cursor-pointer border border-muted-foreground px-4 py-2 rounded-xl max-w-[230px]"
          >
            <span>Contact the owner</span>
            <Send className="text-blue-500" />
          </a>
        </div>
      </div>
    </div>
  );
};
