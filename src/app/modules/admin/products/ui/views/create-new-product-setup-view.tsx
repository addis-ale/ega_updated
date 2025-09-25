"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ProductTitleForm } from "../components/title-form";
import { ProductDescriptionForm } from "../components/description-form";
import { ProductImagesForm } from "../components/image-form";
import { ProductCategoryForm } from "../components/category-form";
import { RentOrSaleForm } from "../components/sale-or-rent-form";
import { DiscountPercentagForm } from "../components/discount-percentage-form";
import { ProductPriceForm } from "../components/price-form";
import { Banner } from "@/components/banner";
import { ProductActions } from "../components/product-action";
import { useConfirm } from "@/hooks/use-confirm";
import { Loader2 } from "lucide-react";

interface Props {
  productId: string;
}
export const CreateNewProductSetupView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
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
  const postProduct = useMutation(
    trpc.products.update.mutationOptions({
      onSuccess: async () => {
        await Promise.all([
          //TODO: invalidate getMany
          queryClient.invalidateQueries(
            trpc.products.getOne.queryOptions({ productId })
          ),
        ]);
        toast.success("Product Posted");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const removeProduct = useMutation(
    trpc.products.remove.mutationOptions({
      onSuccess: async () => {
        await Promise.all([
          //TODO: invalidate getMany
          queryClient.invalidateQueries(
            trpc.products.getOne.queryOptions({ productId })
          ),
        ]);
        toast.success("Product deleted");
        router.push(`/admin/products`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const requiredObj = {
    name: product.name,
    desc: product.description,
    category: product.categoryId,
    rentOrSaleOrBoth: product.rentOrSale,
    coverImg: productImages.length > 0 ? true : null,
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
  const isComplete = requiredFields.every(Boolean);
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
  const initialDiscountData = {
    discountPercentage: product.discountPercentage ?? "",
  };
  const isOfferBoth = product.rentOrSale === "BOTH";
  const handlePostProduct = (isPosted: boolean) => {
    if (isPosted) {
      postProduct.mutate({
        id: productId,
        isPosted: false,
      });
    } else {
      postProduct.mutate({
        id: productId,
        isPosted: true,
      });
    }
  };
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this product`
  );
  const handleRemoveProduct = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeProduct.mutateAsync({ productId });
  };

  const isLoading = postProduct.isPending || removeProduct.isPending;
  return (
    <>
      <RemoveConfirmation />
      {!product.isPosted && (
        <Banner
          variant="warning"
          label="This product is not posted yet and won’t be visible to customers."
        />
      )}
      <div className="p-6 flex flex-col gap-4">
        {isLoading && (
          <div className="absolute h-[100vh] w-full bg-slate-500/20 runded-md top-0 right-0 flex items-center justify-center">
            <Loader2 className="animate-spin size-6" />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 items-end w-fit">
            <h1 className="text-2xl">Product Setup</h1>
            <p className="text-xs text-muted-foreground">
              Complete all fields {completionText}
            </p>
          </div>
          <ProductActions
            onPublish={handlePostProduct}
            disabled={!isComplete || isLoading}
            isPosted={product?.isPosted ?? false}
            onRemove={handleRemoveProduct}
          />
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
            {isOfferBoth ? (
              <div className="flex flex-col gap-4">
                <ProductPriceForm
                  initialData={{ sellingPrice: product.sellingPrice ?? "" }}
                  productId={product.id}
                  fieldName="sellingPrice"
                  label="Selling Price"
                />
                <ProductPriceForm
                  initialData={{ rentalPrice: product.rentalPrice ?? "" }}
                  productId={product.id}
                  fieldName="rentalPrice"
                  label="Rental Price (per day)"
                />
              </div>
            ) : product.rentOrSale === "SALE" ? (
              <ProductPriceForm
                initialData={{ sellingPrice: product.sellingPrice ?? "" }}
                productId={product.id}
                fieldName="sellingPrice"
                label="Selling Price"
              />
            ) : (
              <ProductPriceForm
                initialData={{ rentalPrice: product.rentalPrice ?? "" }}
                productId={product.id}
                fieldName="rentalPrice"
                label="Rental Price (per day)"
              />
            )}

            <DiscountPercentagForm
              initialData={initialDiscountData}
              productId={productId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

<div className="absolute h-full w-full bg-slate-500/20 runded-md top-0 right-0 flex items-center justify-center">
  <Loader2 className="animate-spin size-6" />
</div>;
