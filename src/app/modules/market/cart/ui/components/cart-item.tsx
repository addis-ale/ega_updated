import { Button } from "@/components/ui/button";
import { formatPriceETB } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { format } from "date-fns";
import { DetailSwapCard } from "../../../shop/ui/components/product-image-swiper";
interface Props {
  images: {
    url: string;
    alt: string;
  }[];
  name: string;
  rentalPriceAtAdd?: string;
  rentalStartDate?: string;
  rentalEndDate?: string;
  salePriceAtAdd?: string;
  rentalDateDuration?: number;
  quantity: number;
}

export const CartItem = ({
  images,
  name,
  rentalDateDuration,
  rentalEndDate,
  rentalStartDate,
  rentalPriceAtAdd,
  salePriceAtAdd,
  quantity,
}: Props) => {
  const durationFormat = (dur: string) => {
    const date = new Date(dur);
    const readable = format(date, "MMM dd, yyyy");
    return readable;
  };
  const total =
    rentalPriceAtAdd && rentalDateDuration
      ? rentalDateDuration * quantity * +rentalPriceAtAdd
      : salePriceAtAdd
      ? +salePriceAtAdd * quantity
      : undefined;
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      {/* image */}
      <div className="">
        <div className="w-[350px] md:w-[400px]">
          <DetailSwapCard data={{ images: images! }} />
        </div>
      </div>
      {/* actions */}
      <div className="w-[350px]">
        <div className="flex flex-col gap-y-2 text-muted-foreground">
          <h3 className="text-md font-semibold text-gray-300">{name}</h3>
          {rentalPriceAtAdd && (
            <span className="text-sm border border-gray-300 rounded-lg p-2">
              Rent: {formatPriceETB(+rentalPriceAtAdd)}/day
            </span>
          )}
          {rentalPriceAtAdd && (
            <div className="text-sm border border-gray-300 rounded-lg p-2 flex justify-between">
              <div className="flex items-center gap-4">
                <span>
                  {durationFormat(rentalStartDate!)} -{" "}
                  {durationFormat(rentalEndDate!)}
                </span>
                <span>{rentalDateDuration} days</span>
              </div>
              <Button>
                <EditIcon />
              </Button>
            </div>
          )}
          {salePriceAtAdd && (
            <span className="text-sm border border-gray-300 rounded-lg p-2">
              Buy: {formatPriceETB(+salePriceAtAdd)}
            </span>
          )}
          <div className="flex items-center gap-4 text-sm rounded-lg p-2">
            <span>QTY:</span>
            <div className="flex items-center gap-4">
              <Button className="" variant={"outline"}>
                -
              </Button>
              <span>{quantity}</span>
              <Button variant={"outline"}>+</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm border border-gray-300 rounded-lg p-2 flex items-center gap-4">
              <span>Total:</span>
              {total && <span>{formatPriceETB(total)}</span>}
            </div>
            <Button variant={"destructive"}>Remove</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
