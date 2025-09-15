import { Heart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPriceETB } from "@/lib/utils";
interface Props {
  productName: string;
  productDesc: string;
  sellingPrice?: number;
  rentalPrice?: number;
}
export const ProductDetailDescription = ({
  productName,
  productDesc,
  rentalPrice,
  sellingPrice,
}: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text text-2xl">{productName}</h1>
        <p className="text-muted-foreground leading-6 text-justify">
          {productDesc}
        </p>
        <div className=" mt-4 flex-col gap-4 hidden md:flex">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 ">
            {sellingPrice && (
              <div className="flex items-center justify-between max-w-sm gap-2">
                <span>{formatPriceETB(sellingPrice)}</span>
                <Button
                  size={"lg"}
                  className="bg-chart-2 hover:bg-chart-2 text-white"
                >
                  Buy
                </Button>
              </div>
            )}

            {rentalPrice && (
              <div className="flex items-center justify-between max-w-sm gap-2">
                <span>
                  {formatPriceETB(rentalPrice)}/{"day"}
                </span>
                <Button
                  size={"lg"}
                  className="bg-chart-1 hover:bg-chart-1 text-white"
                >
                  Rent
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            <div className="flex items-center gap-2 justify-between cursor-pointer border border-muted-foreground px-4 py-2 rounded-xl max-w-[230px]">
              <span>Add to favorite</span>
              <Heart className="text-red-500" />
            </div>
            <div className="flex items-center gap-2 justify-between cursor-pointer border border-muted-foreground px-4 py-2 rounded-xl max-w-[230px]">
              <span>Contact the owner</span>
              <Send className="text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
