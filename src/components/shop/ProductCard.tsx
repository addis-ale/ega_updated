import { Button } from "@/components/ui/button";
import { formatPriceETB, truncateText } from "@/lib/utils";
import { Calendar, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { PurchaseType } from "@/constants";

interface ProductInterface {
  productId: string | number;
  ProductPurchaseType: PurchaseType;
  productName: string;
  productImg: string;
  productDiscount: number;
  productRentalPrice?: number;
  productSallingPrice?: number;
  productRentPer?: string;
}
const ProductCard = ({ product }: { product: ProductInterface }) => {
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
          src={product.productImg}
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
            {product.productDiscount}% off
          </Button>
        </div>
        <div className="flex md:justify-between flex-col md:flex-row md:items-center gap-2">
          {product.productSallingPrice && (
            <div className="flex flex-col gap-2 md:gap-4  ">
              <span className="text-sm md:text-xs text-muted-foreground">
                {formatPriceETB(product.productSallingPrice)}
              </span>
              <Button className="bg-chart-2 hover:bg-chart-2 flex items-center gap-2 text-white cursor-pointer">
                <ShoppingCart className="w-5 h-5 text-white" />
                Buy
              </Button>
            </div>
          )}
          {product.productRentalPrice && product.productRentPer && (
            <div className="flex flex-col gap-2 md:gap-4   ">
              <span className="text-sm md:text-xs text-muted-foreground text-wrap">
                {formatPriceETB(product.productRentalPrice)}/
                {product.productRentPer}
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
