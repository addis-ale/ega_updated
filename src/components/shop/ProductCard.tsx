"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPriceETB, truncateText } from "@/lib/utils";
import { productSchemaValues } from "@/lib/validation";
import { Calendar, Heart, ShoppingCart } from "lucide-react";
import { useFavorite } from "@/hooks/useFavorite";
import { useGetFav } from "@/hooks/useGetFav";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DatePicker from "../DateRange";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
const ProductCard = ({ product }: { product: productSchemaValues }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [open, setOpen] = useState(false);
  const handleDateSelect = (selected: DateRange | undefined) => {
    setDate(selected);
  };
  const handleDateSet = () => {
    console.log(date);
    if (date?.from && date?.to) {
      setOpen(false);
      //TODO: add product to cart with productType rent
    }
  };
  const handleBuyBtn = () => {
    //TODO: add product to cart
  };
  const router = useRouter();
  const { data: favoriteProducts } = useGetFav();
  const { mutate: favAddRemove, error } = useFavorite(product.id);
  const isFav = favoriteProducts?.some((fav) => fav.id === product.id);
  useEffect(() => {
    if (error?.message === "AUTH_REQUIRED") {
      router.push("/login");
    }
  }, [error, router]);
  const handleFavAddRemove = () => {
    favAddRemove();
  };

  return (
    <div>
      {product && (
        <div className="relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition-all w-full">
          {/* Favorite Icon */}
          <div className="absolute top-2 right-2 z-10 bg-muted/70 rounded-full">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={handleFavAddRemove}
            >
              <Heart
                className="h-5 w-5 text-red-500"
                fill={`${isFav ? "red" : "none"}`}
              />
            </Button>
          </div>

          {/* Product Image */}
          <div className="relative w-full min-h-[200px] md:min-h-[300px] flex items-center justify-center">
            {product?.ProductImg?.length > 0 ? (
              <Image
                src={product.ProductImg[0]}
                alt={product.productName}
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
              <span>{truncateText(product.productName)}</span>
              <Button size="sm" variant={"destructive"} className="">
                {product.productDiscountPercentage}% off
              </Button>
            </div>
            <div className="flex md:justify-between flex-col md:flex-row md:items-center gap-2">
              {product.productSellingPrice && (
                <div className="flex flex-col gap-2 md:gap-4  ">
                  <span className="text-sm md:text-xs text-muted-foreground">
                    {formatPriceETB(product.productSellingPrice)}
                  </span>
                  <Button
                    className="bg-chart-2 hover:bg-chart-2 flex items-center gap-2 text-white cursor-pointer"
                    onClick={handleBuyBtn}
                  >
                    <ShoppingCart className="w-5 h-5 text-white" />
                    Buy
                  </Button>
                </div>
              )}
              {product.productRentalPrice && product.productRentalPrice && (
                <div className="flex flex-col gap-2 md:gap-4   ">
                  <span className="text-sm md:text-xs text-muted-foreground text-wrap">
                    {formatPriceETB(product.productRentalPrice)}/
                    {product.productRentalPrice}
                  </span>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-chart-1 hover:bg-chart-1 flex items-center gap-2 text-white"
                        onClick={() => setOpen(true)}
                      >
                        <Calendar className="w-5 h-5 text-white" />
                        Rent
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="space-y-4 w-xs">
                      <DialogHeader>
                        <DialogTitle>Select Rental Dates</DialogTitle>
                        <DialogDescription>
                          Please select the rental start and end dates below.
                        </DialogDescription>
                      </DialogHeader>

                      {/* Smaller DatePicker */}
                      <div className="flex flex-col gap-6">
                        <div className="pt-2">
                          <DatePicker
                            value={date}
                            onChange={handleDateSelect}
                          />
                        </div>
                        <Button
                          className="bg-blue-500 hover:bg-blue-500 cursor-pointer"
                          onClick={handleDateSet}
                        >
                          Set
                        </Button>
                      </div>
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

export default ProductCard;
