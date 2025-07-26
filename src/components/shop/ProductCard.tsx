import { Button } from "@/components/ui/button";
import { formatPriceETB, truncateText } from "@/lib/utils";
import { Calendar, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { productSchemaValues } from "@/lib/validation";

const ProductCard = ({ product }: { product: productSchemaValues }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition-all w-full">
      {/* Favorite Icon */}
      <div className="absolute top-2 right-2 z-10 bg-muted/70 rounded-full">
        <Button size="icon" variant="ghost" className="rounded-full">
          <Heart className="h-5 w-5 text-red-500" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="relative w-full min-h-[200px] md:min-h-[300px] flex items-center justify-center">
        <Image
          src={product.ProductImg[0]}
          alt={product.productName}
          fill
          className="object-cover"
        />
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
  );
};

export default ProductCard;
