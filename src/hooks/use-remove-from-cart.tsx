"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { cartItemsOutput } from "@/app/modules/market/shop/types";

interface RemoveFromCartParams {
  cartItemId: string;
}

export const useRemoveFromCart = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.cartItems.remove.mutationOptions({
      onMutate: async (variables) => {
        await queryClient.cancelQueries(trpc.cartItems.getMany.queryOptions());

        const previousCartItems = queryClient.getQueryData<cartItemsOutput>(
          trpc.cartItems.getMany.queryKey()
        );

        // Optimistically remove item
        queryClient.setQueryData<cartItemsOutput>(
          trpc.cartItems.getMany.queryKey(),
          (old) => old?.filter((item) => item.id !== variables.cartItemId) ?? []
        );

        return { previousCartItems };
      },
      onError: (err, _vars, context) => {
        // Rollback to previous state
        if (context?.previousCartItems) {
          queryClient.setQueryData(
            trpc.cartItems.getMany.queryKey(),
            context.previousCartItems
          );
        }
        toast.error(err.message);
      },
      onSettled: () => {
        // Always refetch after mutation
        queryClient.invalidateQueries(trpc.cartItems.getMany.queryOptions());
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.cartItems.getMany.queryOptions()
        );
        toast.success("Removed from cart");
      },
    })
  );

  const removeFromCart = (params: RemoveFromCartParams) => {
    mutation.mutate(params);
  };

  return { removeFromCart, isLoading: mutation.isPending };
};
