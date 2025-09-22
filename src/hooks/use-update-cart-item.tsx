"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { cartItemsOutput } from "@/app/modules/market/shop/types";

interface UpdateCartItemParams {
  cartItemId: string;
  quantity?: number;
  rentalStartDate?: string;
  rentalEndDate?: string;
}

export const useUpdateCartItem = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.cartItems.update.mutationOptions({
      onMutate: async (variables) => {
        // Cancel any outgoing refetches so they don’t overwrite optimistic update
        await queryClient.cancelQueries(trpc.cartItems.getMany.queryOptions());

        // Snapshot previous state
        const previousCartItems = queryClient.getQueryData<cartItemsOutput>(
          trpc.cartItems.getMany.queryKey()
        );

        // Optimistically update the cache
        queryClient.setQueryData<cartItemsOutput>(
          trpc.cartItems.getMany.queryKey(),
          (old) => {
            if (!old) return old;

            return old.map((item) =>
              item.id === variables.cartItemId
                ? {
                    ...item,
                    quantity:
                      variables.quantity !== undefined
                        ? variables.quantity
                        : item.quantity,
                    rentalStartDate:
                      variables.rentalStartDate ?? item.rentalStartDate,
                    rentalEndDate:
                      variables.rentalEndDate ?? item.rentalEndDate,
                  }
                : item
            );
          }
        );

        return { previousCartItems };
      },
      onError: (err, _vars, context) => {
        // Rollback on error
        if (context?.previousCartItems) {
          queryClient.setQueryData(
            trpc.cartItems.getMany.queryKey(),
            context.previousCartItems
          );
        }
        toast.error(err.message);
      },
      onSettled: async () => {
        // Always refetch after mutation
        await queryClient.invalidateQueries(
          trpc.cartItems.getMany.queryOptions()
        );
      },
      onSuccess: async () => {
        toast.success("Cart updated");
      },
    })
  );

  const updateCartItem = (params: UpdateCartItemParams) => {
    mutation.mutate(params);
  };

  return { updateCartItem, isLoading: mutation.isPending };
};
