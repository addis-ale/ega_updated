"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPriceETB } from "@/lib/utils";
import Link from "next/link";
import { ResponsiveDialogue } from "@/components/responsive-dialog";
import { useState } from "react";
import { CheckoutForm } from "../../../shop/ui/components/checkout-form";
interface Props {
  rentalTotal: number;
  purchaseTotal: number;
  total: number;
}
export const CartSummary = ({ rentalTotal, purchaseTotal, total }: Props) => {
  const [open, onOpenChange] = useState(false);
  return (
    <div className="w-full md:col-span-2 self-start">
      <div className="sticky top-20">
        <div className="flex flex-col gap-y-4 rounded-2xl p-4 md:p-6 bg-sidebar-border">
          <h2 className="text-xl md:text-2xl text-gray-300">Summary:</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs md:text-sm">Rental Total:</span>
              <span className="text-xs md:text-sm">
                {formatPriceETB(rentalTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs md:text-sm">Purchase Total:</span>
              <span className="text-xs md:text-sm">
                {formatPriceETB(purchaseTotal)}
              </span>
            </div>
          </div>
          <Separator className="border-b-2 border-dashed border-white" />
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm">Total:</span>
            <span className="text-xs md:text-sm">{formatPriceETB(total)}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <Link href={"/shop"}>
              <Button size={"sm"} variant={"link"}>
                Continue Shopping
              </Button>
            </Link>
            <Button
              className="bg-teal-500 hover:bg-teal-500/80 text-gray-300"
              onClick={() => onOpenChange(true)}
            >
              Checkout
            </Button>
            <ResponsiveDialogue
              open={open}
              onOpenChange={onOpenChange}
              title="Enter Telegram Username"
              description="Provide your Telegram username so the admin can contact you to checkout."
            >
              <CheckoutForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
              />
            </ResponsiveDialogue>
          </div>
        </div>
      </div>
    </div>
  );
};
