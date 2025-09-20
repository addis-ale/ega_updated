"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CartItem } from "../components/cart-item";
import { CartSummary } from "../components/cart-summary";
import { EmptyState } from "@/components/empty-state";

export const CartView = () => {
  const trpc = useTRPC();
  const { data: cartItems } = useSuspenseQuery(
    trpc.cartItems.getMany.queryOptions()
  );
  const cartItemIds = cartItems.map((item) => item.id);
  const purchasedItems = cartItems.filter((item) =>
    Boolean(item.salePriceAtAdd)
  );
  const purchaseTotal = purchasedItems.reduce(
    (acc, cur) => acc + +cur.salePriceAtAdd! * cur.quantity,
    0 // initial value for acc
  );
  const rentedItems = cartItems.filter((item) =>
    Boolean(item.rentalPriceAtAdd)
  );
  const rentalTotal = rentedItems.reduce(
    (acc, cur) =>
      acc + +cur.rentalPriceAtAdd! * cur.quantity * +cur.rentalDateDuration!,
    0 // initial value for acc
  );
  const total = purchaseTotal + rentalTotal;
  if (cartItems.length === 0) {
    return (
      <div className="mt-16">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added any items yet. Browse our products and add your favorites to get started!"
        />
      </div>
    );
  } else
    return (
      <div className="mt-16 max-w-6xl mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          Items in Your Cart
        </h1>
        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:items-start md:grid-cols-7">
          {/* left */}
          <div className="md:col-span-5 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                name={item.product.name}
                cartItemId={item.id}
                images={item.product.images.map((im) => ({
                  url: im.url,
                  alt: im.url,
                }))}
                quantity={item.quantity}
                rentalPriceAtAdd={item.rentalPriceAtAdd ?? undefined}
                rentalDateDuration={item.rentalDateDuration ?? undefined}
                rentalStartDate={
                  item.rentalStartDate
                    ? new Date(item.rentalStartDate)
                    : undefined
                }
                rentalEndDate={
                  item.rentalEndDate ? new Date(item.rentalEndDate) : undefined
                }
                salePriceAtAdd={item.salePriceAtAdd ?? undefined}
              />
            ))}
          </div>

          {/* right */}

          <CartSummary
            total={total}
            purchaseTotal={purchaseTotal}
            rentalTotal={rentalTotal}
            cartItemIds={cartItemIds}
          />
        </div>
      </div>
    );
};
