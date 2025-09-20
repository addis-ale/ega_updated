"use client";
import { Calendar, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { addDays } from "date-fns";
import { cn, formatPriceETB, truncateText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductLists } from "../../types";
import { Badge } from "@/components/ui/badge";

import { useFavorite } from "@/hooks/use-favorite";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { RentalDatePicker } from "./rental-date-picker";

interface Props {
  product: ProductLists[number];
}

export const ProductCard = ({ product }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { addToCart, isLoading } = useAddToCart();
  const { toggleFavorite, isFavorite } = useFavorite(product.products.id);

  const handleBuyBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!product.products.sellingPrice) {
      toast.error("This product is not available for sale");
      return;
    }

    addToCart({
      productId: product.products.id,
      actionType: "SALE",
      salePriceAtAdd: product.products.sellingPrice.toString(),
    });
  };

  const handleRentBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <div>
      {product && (
        <div
          className="relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition-all w-full"
          onClick={() => router.push(`/shop/${product.products.id}`)}
        >
          {/* Favorite Icon */}
          <div className="absolute top-2 right-2 z-10 bg-muted/70 rounded-full">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite.mutate({ productId: product.products.id });
              }}
            >
              <Heart
                className={cn(
                  "h-5 w-5 text-red-500",
                  isFavorite && "fill-red-500"
                )}
              />
            </Button>
          </div>

          {/* Product Image */}
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
              {/* Buy */}
              {product.products.sellingPrice && (
                <div className="flex flex-col gap-2 md:gap-4">
                  <span className="text-sm md:text-xs text-muted-foreground">
                    {formatPriceETB(+product.products.sellingPrice)}
                  </span>
                  <Button
                    disabled={isLoading}
                    className="bg-chart-2 hover:bg-chart-2 flex items-center gap-2 text-white cursor-pointer"
                    onClick={handleBuyBtn}
                  >
                    <ShoppingCart className="w-5 h-5 text-white" />
                    Buy
                  </Button>
                </div>
              )}

              {/* Rent */}
              {product.products.rentalPrice && (
                <div className="flex flex-col gap-2 md:gap-4">
                  <span className="text-sm md:text-xs text-muted-foreground">
                    {formatPriceETB(+product.products.rentalPrice)}/
                    <span>per day</span>
                  </span>

                  <Button
                    disabled={isLoading}
                    className="bg-chart-1 hover:bg-chart-1 flex items-center gap-2 text-white"
                    onClick={handleRentBtn}
                  >
                    <Calendar className="w-5 h-5 text-white" />
                    Rent
                  </Button>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="space-y-4 w-xs">
                      <DialogHeader>
                        <DialogTitle>Select Rental Dates</DialogTitle>
                        <DialogDescription>
                          Please select the rental start and end dates below.
                        </DialogDescription>
                      </DialogHeader>

                      <RentalDatePicker
                        defaultValue={date}
                        onConfirm={(selectedDate) => {
                          if (!product.products.rentalPrice) {
                            toast.error(
                              "This product is not available for rent"
                            );
                            return;
                          }

                          addToCart({
                            productId: product.products.id,
                            actionType: "RENT",
                            rentalPriceAtAdd:
                              product.products.rentalPrice.toString(),
                            rentalStartDate: selectedDate.from!.toISOString(),
                            rentalEndDate: selectedDate.to!.toISOString(),
                          });

                          setDate(selectedDate);
                          setOpen(false);
                        }}
                        onCancel={() => setOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
