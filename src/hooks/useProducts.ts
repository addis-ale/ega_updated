import { GetProductsResponse } from "@/lib/validation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useProducts = () => {
  return useQuery<GetProductsResponse>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/products`
      );
      return res.data;
    },
  });
};
