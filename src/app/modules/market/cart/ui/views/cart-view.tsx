"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const CartView = () => {
  const trpc = useTRPC();
  const { data: cartItems } = useSuspenseQuery(
    trpc.cartItems.getMany.queryOptions()
  );
  return <div className="mt-8">cart view</div>;
};
