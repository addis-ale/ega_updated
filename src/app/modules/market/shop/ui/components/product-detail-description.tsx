import { Calendar, Heart, Send, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatPriceETB } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { addDays } from "date-fns";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { useFavorite } from "@/hooks/use-favorite";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RentalDatePicker } from "./rental-date-picker";
interface Props {
  productId: string;
  productName: string;
  productDesc: string;
  sellingPrice?: number;
  rentalPrice?: number;
}
export const ProductDetailDescription = ({
  productId,
  productName,
  productDesc,
  rentalPrice,
  sellingPrice,
}: Props) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [open, setOpen] = useState(false);
  const { addToCart, isLoading } = useAddToCart();
  const { toggleFavorite, isFavorite } = useFavorite(productId);
  const handleBuyBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!sellingPrice) {
      toast.error("This product is not available for sale");
      return;
    }

    addToCart({
      productId: productId,
      actionType: "SALE",
      salePriceAtAdd: sellingPrice.toString(),
    });
  };
  const handleRentBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text text-2xl">{productName}</h1>
        <p className="text-muted-foreground leading-6 text-justify">
          {productDesc}
        </p>
        <div className=" mt-4 flex-col gap-4 hidden md:flex">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 ">
            {sellingPrice && (
              <div className="flex items-center justify-between max-w-sm gap-2">
                <span>{formatPriceETB(sellingPrice)}</span>
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

            {rentalPrice && (
              <div className="flex items-center justify-between max-w-sm gap-2">
                <span>
                  {formatPriceETB(rentalPrice)}/{"day"}
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
                        if (!rentalPrice) {
                          toast.error("This product is not available for rent");
                          return;
                        }

                        addToCart({
                          productId,
                          actionType: "RENT",
                          rentalPriceAtAdd: rentalPrice.toString(),
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
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            <div
              className="flex items-center gap-2 justify-between cursor-pointer border border-muted-foreground px-4 py-2 rounded-xl max-w-[230px] "
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite.mutate({ productId });
              }}
            >
              <span>Add to favorite</span>
              <Heart
                className={cn(
                  "h-5 w-5 text-red-500",
                  isFavorite && "fill-red-500"
                )}
              />
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
    </div>
  );
};
