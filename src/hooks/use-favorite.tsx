"use client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { FavoriteItemsOutput } from "@/app/modules/market/shop/types";

export function useFavorite(productId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // fetch favorites
  const { data: favoriteItems } = useSuspenseQuery(
    trpc.favoriteItems.getMany.queryOptions()
  );

  const isFavorite = favoriteItems
    .map((item) => item.products.id)
    .some((pr) => pr === productId);

  // mutation
  const toggleFavorite = useMutation(
    trpc.favoriteItems.toggle.mutationOptions({
      onMutate: async (variables) => {
        await queryClient.cancelQueries(
          trpc.favoriteItems.getMany.queryOptions()
        );

        const previousFavorites = queryClient.getQueryData<FavoriteItemsOutput>(
          trpc.favoriteItems.getMany.queryKey()
        );

        queryClient.setQueryData<FavoriteItemsOutput>(
          trpc.favoriteItems.getMany.queryKey(),
          (old) => {
            if (!old) return old;

            const alreadyFav = old.some(
              (item) => item.products.id === variables.productId
            );

            if (alreadyFav) {
              return old.filter(
                (item) => item.products.id !== variables.productId
              );
            } else {
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
          }
        );

        return { previousFavorites };
      },

      onError: (err, _vars, context) => {
        if (context?.previousFavorites) {
          queryClient.setQueryData(
            trpc.favoriteItems.getMany.queryKey(),
            context.previousFavorites
          );
        }
        toast.error(err.message);
      },

      onSettled: () => {
        queryClient.invalidateQueries(
          trpc.favoriteItems.getMany.queryOptions()
        );
      },

      onSuccess: (data) => {
        if (data.action === "added") {
          toast.success("Added to favorites");
        } else {
          toast.success("Removed from favorites");
        }
      },
    })
  );

  return { isFavorite, toggleFavorite };
}
