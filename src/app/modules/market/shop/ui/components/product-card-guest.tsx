"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, ShoppingCart, Calendar } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductLists } from "../../types";
import { formatPriceETB, truncateText } from "@/lib/utils";
interface Props {
  product: ProductLists[number];
}

export const ProductCardGuest = ({ product }: Props) => {
  const router = useRouter();
  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.error("Please sign in to continue");
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition-all w-full"
      onClick={() => router.push(`/shop/${product.products.id}`)}
    >
      {/* Favorite */}
      <div className="absolute top-2 right-2 z-10 bg-muted/70 rounded-full">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={handleAction}
        >
          <Heart className="h-5 w-5 text-red-500" />
        </Button>
      </div>

      {/* Image */}
      <div className="relative w-full min-h-[200px] md:min-h-[300px] flex items-center justify-center">
        {product.product_images ? (
          <Image
            src={product.product_images.imageUrl!}
            alt={product.products.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="text-sm text-gray-400">No Image Available</div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 space-y-3">
        <div className="flex justify-between items-center">
          <span>{truncateText(product.products.name)}</span>
          {product.products.discountPercentage && (
            <Badge variant={"destructive"} className="p-2">
              {product.products.discountPercentage}% off
            </Badge>
          )}
        </div>

        <div className="flex md:justify-between flex-col md:flex-row md:items-center gap-2">
          {product.products.sellingPrice && (
            <div className="flex flex-col gap-2 md:gap-4">
              <span className="text-sm md:text-xs text-muted-foreground">
                {formatPriceETB(+product.products.sellingPrice)}
              </span>
              <Button
                className="bg-chart-2 hover:bg-chart-2 flex items-center gap-2 text-white cursor-pointer"
                onClick={handleAction}
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                Buy
              </Button>
            </div>
          )}

          {product.products.rentalPrice && (
            <div className="flex flex-col gap-2 md:gap-4">
              <span className="text-sm md:text-xs text-muted-foreground">
                {formatPriceETB(+product.products.rentalPrice)}/
                <span>per day</span>
              </span>
              <Button
                className="bg-chart-1 hover:bg-chart-1 flex items-center gap-2 text-white"
                onClick={handleAction}
              >
                <Calendar className="w-5 h-5 text-white" />
                Rent
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
