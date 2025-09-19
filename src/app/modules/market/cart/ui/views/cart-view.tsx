"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTRPC } from "@/trpc/client";
import { ProductCarousal } from "../../../shop/ui/components/product-carousal";
import { formatPriceETB } from "@/lib/utils";
import { format } from "date-fns";
import { EditIcon } from "lucide-react";

export const CartView = () => {
  const trpc = useTRPC();
  const { data: cartItems } = useSuspenseQuery(
    trpc.cartItems.getMany.queryOptions()
  );
  const durationFormat = (dur: string) => {
    const date = new Date(dur);
    const readable = format(date, "MMM dd, yyyy");
    return readable;
  };
  return (
    <div className="mt-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-7 ">
        {/* left */}
        <div className="col-span-5 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              {/* image */}
              <div className="">
                <div className="w-[400px]">
                  <ProductCarousal
                    images={item.product.images.map((im) => ({
                      url: im.url,
                      alt: im.url,
                    }))}
                  />
                </div>
              </div>
              {/* actions */}
              <div className="w-[350px]">
                <div className="flex flex-col gap-y-2 text-muted-foreground">
                  <h3 className="text-md font-semibold text-gray-300">
                    {item.product.name}
                  </h3>
                  {item.rentalPriceAtAdd && (
                    <span className="text-sm border border-gray-300 rounded-lg p-2">
                      Rent: {formatPriceETB(+item.rentalPriceAtAdd)}/day
                    </span>
                  )}
                  {item.rentalPriceAtAdd && (
                    <div className="text-sm border border-gray-300 rounded-lg p-2 flex justify-between">
                      <div className="flex items-center gap-4">
                        <span>
                          {durationFormat(item.rentalStartDate!)} -{" "}
                          {durationFormat(item.rentalEndDate!)}
                        </span>
                        <span>{item.rentalDateDuration} days</span>
                      </div>
                      <Button>
                        <EditIcon />
                      </Button>
                    </div>
                  )}
                  {item.salePriceAtAdd && (
                    <span className="text-sm border border-gray-300 rounded-lg p-2">
                      Buy: {formatPriceETB(+item.salePriceAtAdd)}
                    </span>
                  )}
                  <div className="flex items-center gap-4 text-sm rounded-lg p-2">
                    <span>QTY:</span>
                    <div className="flex items-center gap-4">
                      <Button className="" variant={"outline"}>
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant={"outline"}>+</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm border border-gray-300 rounded-lg p-2 flex items-center gap-4">
                      <span>Total:</span>
                      <span>60,000ETB</span>
                    </div>
                    <Button variant={"destructive"}>Remove</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* right */}
        <div className="col-span-2">
          <div className="sticky top-52 z-20">
            <div className="flex flex-col gap-y-4 rounded-2xl p-4 md:p-6 bg-sidebar-border">
              <h2 className="text-2xl text-gray-300">Summary:</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Rental Total:</span>
                  <span>3,000 ETB</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Purchase Total:</span>
                  <span>3,000 ETB</span>
                </div>
              </div>
              <Separator className="border-b-2 border-dashed border-white" />
              <div className="flex items-center justify-between">
                <span>Total:</span>
                <span>5,000ETB</span>
              </div>
              <div className="flex items-center justify-between mt-5">
                <Link href={"/shop"}>
                  <Button size={"sm"} variant={"link"}>
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  size={"sm"}
                  variant={"default"}
                  className="bg-teal-500 hover:bg-teal-500 text-white"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
