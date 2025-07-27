import { productSchemaValues } from "@/lib/validation";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFav = () => {
  const { getToken } = useAuth();
  return useQuery<productSchemaValues[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/favorite`,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      console.log("your favorite products", res.data);
      return res.data;
    },
  });
};
