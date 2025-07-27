"use client";

import { Button } from "@/components/ui/button";
import { formatPriceETB, truncateText } from "@/lib/utils";
import { Calendar, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { productSchemaValues } from "@/lib/validation";
import { useFavorite } from "@/hooks/useFavorite";
import { useGetFav } from "@/hooks/useGetFav";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: productSchemaValues }) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const handleFavAddRemove = async () => {
    const token = await getToken();
    if (!token) {
      console.log("login");
      router.push("/login");
    }
    favAddRemove();
  };
  const { data: favoriteProducts } = useGetFav();
  const isFav = favoriteProducts?.some((fav) => fav.id === product.id);

  const { mutate: favAddRemove } = useFavorite(product.id);
  return (
    <div>
      {product && (
        <div className="relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition-all w-full">
          {/* Favorite Icon */}
          <div className="absolute top-2 right-2 z-10 bg-muted/70 rounded-full">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={handleFavAddRemove}
            >
              <Heart
                className="h-5 w-5 text-red-500"
                fill={`${isFav ? "red" : "none"}`}
              />
            </Button>
          </div>

          {/* Product Image */}
          <div className="relative w-full min-h-[200px] md:min-h-[300px] flex items-center justify-center">
            {product?.ProductImg?.length > 0 ? (
              <Image
                src={product.ProductImg[0]}
                alt={product.productName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-sm text-gray-400">No Image Available</div>
            )}
          </div>

          {/* Content */}
          <div className="p-2 space-y-3">
            <div className="flex justify-between items-center">
              <span>{truncateText(product.productName)}</span>
              <Button size="sm" variant={"destructive"} className="">
                {product.productDiscountPercentage}% off
              </Button>
            </div>
            <div className="flex md:justify-between flex-col md:flex-row md:items-center gap-2">
              {product.productSellingPrice && (
                <div className="flex flex-col gap-2 md:gap-4  ">
                  <span className="text-sm md:text-xs text-muted-foreground">
                    {formatPriceETB(product.productSellingPrice)}
                  </span>
                  <Button className="bg-chart-2 hover:bg-chart-2 flex items-center gap-2 text-white cursor-pointer">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    Buy
                  </Button>
                </div>
              )}
              {product.productRentalPrice && product.productRentalPrice && (
                <div className="flex flex-col gap-2 md:gap-4   ">
                  <span className="text-sm md:text-xs text-muted-foreground text-wrap">
                    {formatPriceETB(product.productRentalPrice)}/
                    {product.productRentalPrice}
                  </span>
                  <Button className="bg-chart-1 hover:bg-chart-1 flex items-center gap-2 text-white cursor-pointer">
                    <Calendar className="w-5 h-5 text-white" />
                    Rent
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
