"use client";
import { Button } from "@/components/ui/button";
import { formatPriceETB } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { format } from "date-fns";
import { DetailSwapCard } from "../../../shop/ui/components/product-image-swiper";
import { toast } from "sonner";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { RentalDatePicker } from "../../../shop/ui/components/rental-date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateCartItem } from "@/hooks/use-update-cart-item";
import { useRemoveFromCart } from "@/hooks/use-remove-from-cart";

interface Props {
  images: {
    url: string;
    alt: string;
  }[];
  name: string;
  cartItemId: string;
  rentalPriceAtAdd?: string;
  rentalStartDate?: Date;
  rentalEndDate?: Date;
  salePriceAtAdd?: string;
  rentalDateDuration?: number;
  quantity: number;
}

export const CartItem = ({
  images,
  name,
  rentalDateDuration,
  rentalEndDate,
  rentalStartDate,
  rentalPriceAtAdd,
  salePriceAtAdd,
  quantity,
  cartItemId,
}: Props) => {
  const [date, setDate] = useState<DateRange | undefined>(
    rentalStartDate && rentalEndDate
      ? { from: rentalStartDate, to: rentalEndDate }
      : undefined
  );

  const [open, setOpen] = useState(false);
  const durationFormat = (dur: string) => {
    const date = new Date(dur);
    const readable = format(date, "MMM dd, yyyy");
    return readable;
  };
  const total =
    rentalPriceAtAdd && rentalDateDuration
      ? rentalDateDuration * quantity * +rentalPriceAtAdd
      : salePriceAtAdd
      ? +salePriceAtAdd * quantity
      : undefined;

  const { updateCartItem, isLoading: updating } = useUpdateCartItem();
  const { removeFromCart, isLoading: removing } = useRemoveFromCart();
  const isLoading = updating || removing;
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      {/* image */}
      <div className="">
        <div className="w-[350px] md:w-[400px]">
          <DetailSwapCard data={{ images: images! }} />
        </div>
      </div>
      {/* actions */}
      <div className="w-[350px]">
        <div className="flex flex-col gap-y-2 text-muted-foreground">
          <h3 className="text-md font-semibold text-gray-300">{name}</h3>
          {rentalPriceAtAdd && (
            <span className="text-sm border border-gray-300 rounded-lg p-2">
              Rent: {formatPriceETB(+rentalPriceAtAdd)}/day
            </span>
          )}
          {rentalPriceAtAdd && (
            <div className="text-sm border border-gray-300 rounded-lg p-2 flex justify-between">
              <div className="flex items-center gap-4">
                {date?.from && date?.to && (
                  <>
                    <span>
                      {durationFormat(date.from.toISOString())} -{" "}
                      {durationFormat(date.to.toISOString())}
                    </span>
                    <span>
                      {Math.ceil(
                        (date.to.getTime() - date.from.getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </span>
                  </>
                )}
              </div>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                <EditIcon />
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
                      if (!rentalPriceAtAdd) {
                        toast.error("This product is not available for rent");
                        return;
                      }

                      updateCartItem({
                        cartItemId,
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
          {salePriceAtAdd && (
            <span className="text-sm border border-gray-300 rounded-lg p-2">
              Buy: {formatPriceETB(+salePriceAtAdd)}
            </span>
          )}
          <div className="flex items-center gap-4 text-sm rounded-lg p-2">
            <span>QTY:</span>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (quantity > 1) {
                    updateCartItem({
                      cartItemId,
                      quantity: quantity - 1,
                    });
                  }
                }}
                disabled={isLoading || quantity <= 1}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                variant="outline"
                onClick={() => {
                  updateCartItem({
                    cartItemId,
                    quantity: quantity + 1,
                  });
                }}
                disabled={isLoading}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm border border-gray-300 rounded-lg p-2 flex items-center gap-4">
              <span>Total:</span>
              {total && <span>{formatPriceETB(total)}</span>}
            </div>
            <Button
              variant={"destructive"}
              disabled={isLoading}
              onClick={() => removeFromCart({ cartItemId })}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
