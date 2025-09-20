"use client";

import { useState } from "react";
import { Calendar, Heart, Send, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPriceETB } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
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
  productName: string;
  productDesc: string;
  sellingPrice?: number;
  rentalPrice?: number;
}

export const ProductDetailDescriptionGuest = ({
  productName,
  productDesc,
  rentalPrice,
  sellingPrice,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [open, setOpen] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.error("Please sign in to continue");
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
                  className="bg-chart-2 hover:bg-chart-2 flex items-center gap-2 text-white cursor-pointer"
                  onClick={handleAction}
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
                  className="bg-chart-1 hover:bg-chart-1 flex items-center gap-2 text-white"
                  onClick={handleAction}
                >
                  <Calendar className="w-5 h-5 text-white" />
                  Rent
                </Button>

                {/* Just show dialog for UX but action blocked */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="space-y-4 w-xs">
                    <DialogHeader>
                      <DialogTitle>Select Rental Dates</DialogTitle>
                      <DialogDescription>
                        Please sign in to confirm rental dates.
                      </DialogDescription>
                    </DialogHeader>
                    <RentalDatePicker
                      defaultValue={date}
                      onConfirm={() => {
                        toast.error("Please sign in to continue");
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
              onClick={handleAction}
            >
              <span>Add to favorite</span>
              <Heart className="h-5 w-5 text-red-500" />
            </div>

            <a
              href={`https://t.me/${process.env.ADMIN_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-between cursor-pointer border border-muted-foreground px-4 py-2 rounded-xl max-w-[230px] "
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
