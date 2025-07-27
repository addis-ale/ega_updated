import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddToCart = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (data) => {
      const token = await getToken();
      if (!token) throw new Error("AUTH_REQUIRED");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/cart/add`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data;
    },
  });
};
