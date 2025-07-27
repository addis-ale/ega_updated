import { productSchemaValues } from "@/lib/validation";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useFavorite = (id: number) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const token = await getToken();
      console.log(token);
      if (!token) {
        throw new Error("AUTH_REQUIRED");
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/favorite/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const previousFavorites = queryClient.getQueryData<productSchemaValues[]>(
        ["favorites"]
      );
      const isAlreadyFavorite = previousFavorites?.some(
        (item) => item.id === id
      );
      queryClient.setQueryData(
        ["favorites"],
        (old: productSchemaValues[] = []) =>
          isAlreadyFavorite
            ? old.filter((item) => item.id !== id)
            : [...old, { id: id }]
      );

      return { previousFavorites };
    },
    onError: (error, _variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
    },

    // ✅ Always refetch after mutation (success or error)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
