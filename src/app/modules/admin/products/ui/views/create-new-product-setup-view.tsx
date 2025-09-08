"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ProductTitleForm } from "../components/title-form";
import { ProductDescriptionForm } from "../components/description-form";
import { ProductImagesForm } from "../components/image-form";
import { ProductCategoryForm } from "../components/category-form";
import { RentOrSaleForm } from "../components/sale-or-rent-form";

interface Props {
  productId: string;
}
export const CreateNewProductSetupView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data: product } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({
      productId,
    })
  );
  const { data: productImages } = useSuspenseQuery(
    trpc.productImages.getMany.queryOptions({
      productId,
    })
  );
  const { data: categories } = useSuspenseQuery(
    trpc.productCategories.getMany.queryOptions()
  );
  const requiredObj = {
    name: product.name,
    desc: product.description,
    category: product.categoryId,
    rentOrSaleOrBoth: product.rentOrSale,
    coverImg: productImages.length > 0 ? true : null,
    // TODO make image also required
  };
  const finalrequiredObj =
    requiredObj.rentOrSaleOrBoth === "BOTH"
      ? {
          ...requiredObj,
          salePrice: product.sellingPrice,
          rentalPrice: product.rentalPrice,
        }
      : requiredObj.rentOrSaleOrBoth === "SALE"
      ? { ...requiredObj, salePrice: product.sellingPrice }
      : { ...requiredObj, rentalPrice: product.rentalPrice };
  const requiredFields = Object.values(finalrequiredObj);
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  //const isComplete = requiredFields.every(Boolean);
  const completionText = `(${completedFields}/${totalFields})`;
  const initialProductNameData = {
    name: product.name,
  };
  const initialProductDescData = {
    description: product.description ?? "",
  };
  const initialProductImagesData = {
    images: productImages.map((image) => ({
      id: image.id,
      url: image.imageUrl,
      isCover: image.isCoverImage ?? false,
    })),
  };
  const initialCatData = {
    categoryId: product.categoryId ?? "",
  };
  const initalSaleOrRentData = {
    rentOrSale:
      (product?.rentOrSale ?? "") === "BOTH"
        ? "0"
        : (product?.rentOrSale ?? "") === "SALE"
        ? "1"
        : "2",
  };
  console.log(productImages, "images data from setup");
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-end w-fit">
        <h1 className="text-2xl">Product Setup</h1>
        <p className="text-xs text-muted-foreground">
          Complete all fields {completionText}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          <ProductTitleForm
            initialData={initialProductNameData}
            productId={productId}
          />
          <ProductDescriptionForm
            initialData={initialProductDescData}
            productId={productId}
          />
          <ProductImagesForm
            initialData={initialProductImagesData}
            productId={productId}
          />
          <div className="grid grid-cols-2 gap-4 ">
            <ProductCategoryForm
              initialData={initialCatData}
              productId={productId}
              options={(categories || [])?.map((cat) => ({
                label: cat.name,
                value: cat.id,
              }))}
            />
            <RentOrSaleForm
              initialData={initalSaleOrRentData}
              productId={productId}
              options={[
                { label: "BOTH", value: "0" },
                { label: "SALE", value: "1" },
                { label: "RENT", value: "2" },
              ]?.map((cat) => ({
                label: cat.label,
                value: cat.value,
              }))}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {/* sale or rent */}
          {/* price */}
          {/* discount */}
        </div>
      </div>
    </div>
  );
};
