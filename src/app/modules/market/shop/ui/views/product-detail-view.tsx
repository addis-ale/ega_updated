"use client";
import { useTRPC } from "@/trpc/client";
import { ProductCarousal } from "../components/product-carousal";
import { ProductDetailDescription } from "../components/product-detail-description";
import { useSuspenseQuery } from "@tanstack/react-query";
interface Props {
  productId: string;
}
export const ProductDetailView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data: productItem } = useSuspenseQuery(
    trpc.productItems.getOne.queryOptions({
      productId,
    })
  );
  const imageUrls = productItem?.images.map((image) => ({
    url: image.imageUrl,
    alt: image.id,
  }));
  return (
    <div className="mt-44 md:mt-48">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-6 ">
          {/* image */}
          <div className="flex-1">
            <ProductCarousal
              images={imageUrls!}
              sellingPrice={
                productItem?.sellingPrice
                  ? +productItem.sellingPrice
                  : undefined
              }
              rentalPrice={
                productItem?.rentalPrice ? +productItem.rentalPrice : undefined
              }
            />
          </div>
          {/* description */}
          <div className="flex-1">
            <ProductDetailDescription
              productId={productId}
              productDesc={productItem?.description ?? ""}
              productName={productItem?.name ?? ""}
              sellingPrice={
                productItem?.sellingPrice
                  ? +productItem.sellingPrice
                  : undefined
              }
              rentalPrice={
                productItem?.rentalPrice ? +productItem.rentalPrice : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
