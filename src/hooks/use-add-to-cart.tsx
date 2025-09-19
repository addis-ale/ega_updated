"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { cartItemsOutput } from "@/app/modules/market/shop/types";

interface AddToCartParams {
  productId: string;
  quantity?: number;
  actionType: "SALE" | "RENT";
  salePriceAtAdd?: string;
  rentalPriceAtAdd?: string;
  rentalStartDate?: string;
  rentalEndDate?: string;
}

export const useAddToCart = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.cartItems.create.mutationOptions({
      onMutate: async (variables) => {
        await queryClient.cancelQueries(trpc.cartItems.getMany.queryOptions());
        const previousCartItems = queryClient.getQueryData<cartItemsOutput>(
          trpc.cartItems.getMany.queryKey()
        );
        queryClient.setQueryData<cartItemsOutput>(
          trpc.cartItems.getMany.queryKey(),
          (old) => {
            if (!old) return old;
            return [
              ...old,
              {
                products: {
                  id: variables.productId,
                  name: "Loading...",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  userId: "optimistic",
                  rentOrSale: null,
                  description: null,
                  discountPercentage: null,
                  rentalPrice: null,
                  sellingPrice: null,
                  views: null,
                  categoryId: null,
                  isPosted: null,
                },
                product_images: {
                  id: "optimistic-img",
                  productId: variables.productId,
                  isCoverImage: null,
                  imageUrl: "",
                },
              },
            ];
          }
        );

        return { previousCartItems };
      },
      onError: (err, _vars, context) => {
        if (context?.previousCartItems) {
          queryClient.setQueryData(
            trpc.favoriteItems.getMany.queryKey(),
            context.previousCartItems
          );
        }
        toast.error(err.message);
      },
      onSettled: () => {
        queryClient.invalidateQueries(
          trpc.favoriteItems.getMany.queryOptions()
        );
      },
      onSuccess: () => {
        toast.success("Added to cart");
      },
    })
  );
  const addToCart = (params: AddToCartParams) => {
    mutation.mutate({
      productId: params.productId,
      quantity: params.quantity ?? 1,
      actionType: params.actionType,
      salePriceAtAdd: params.salePriceAtAdd,
      rentalPriceAtAdd: params.rentalPriceAtAdd,
      rentalStartDate: params.rentalStartDate,
      rentalEndDate: params.rentalEndDate,
    });
  };

  return { addToCart, isLoading: mutation.isPending };
};
