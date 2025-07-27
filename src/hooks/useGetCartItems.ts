import { GetCartItemResponse } from "@/lib/validation";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetCartItems = () => {
  const { getToken } = useAuth();
  return useQuery<GetCartItemResponse[]>({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("AUTH_REQUIRED");
      }
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });
};
