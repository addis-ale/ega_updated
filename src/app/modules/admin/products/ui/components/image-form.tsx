"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { ImageIcon, PlusCircle, Trash2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { insertProductImagesSchema } from "../../schema";
import { cn } from "@/lib/utils";
interface Props {
  initialData: {
    images: {
      id: string;
      url: string;
      isCover: boolean;
    }[];
  };
  productId: string;
}

export const ProductImagesForm = ({ initialData, productId }: Props) => {
  console.log("initial Data for images", initialData);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const coverIndex = initialData.images.findIndex(
    (img) => img.isCover === true
  );
  const selectedIndex = coverIndex >= 0 ? coverIndex : 0;

  const [coverImage, setCoverImage] = useState(selectedIndex);
  const onSubmit = (data: z.infer<typeof insertProductImagesSchema>) => {
    console.log("data", data);
    createProductImage.mutate({
      imageUrl: data.imageUrl,
      productId: productId,
    });
  };
  const handleDelete = (id: string) => {
    deleteProductImage.mutate({
      productId: productId,
      id,
    });
  };
  const handleSetCoverImg = (id: string) => {
    updateCoverImage.mutate({
      productId,
      id,
    });
  };
  const createProductImage = useMutation(
    trpc.productImages.create.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries get many courses
        if (productId)
          await Promise.all([
            // queryClient.invalidateQueries(
            //   trpc.courses.getOne.queryOptions({ id: courseId })
            // ),

            queryClient.invalidateQueries(
              trpc.productImages.getMany.queryOptions({ productId })
            ),
          ]);
        setOpenEdit(false);
        toast.success("Product image updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const deleteProductImage = useMutation(
    trpc.productImages.delete.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries get many courses
        if (productId) {
          await queryClient.invalidateQueries(
            trpc.productImages.getMany.queryOptions({ productId })
          );
        }
        setOpenEdit(false);
        toast.success("Product image deleted!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateCoverImage = useMutation(
    trpc.productImages.update.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries get many courses
        if (productId)
          await Promise.all([
            // queryClient.invalidateQueries(
            //   trpc.courses.getOne.queryOptions({ id: courseId })
            // ),

            queryClient.invalidateQueries(
              trpc.productImages.getMany.queryOptions({ productId })
            ),
          ]);
        setOpenEdit(false);
        toast.success("Product cover image setted!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const isLoading =
    createProductImage.isPending || deleteProductImage.isPending;
  return (
    <div className="bg-sidebar-border p-3 ">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">Product Images</h3>
            {openEdit && (
              <Button
                variant={"outline"}
                onClick={() => setOpenEdit(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
            {/* {!openEdit && (initialData?.imageUrls.length ?? 0) > 0 && (
              <Button
                className=""
                variant={"outline"}
                onClick={() => setOpenEdit(true)}
                disabled={isLoading}
              >
                <PenIcon className="size-5" /> Edit
              </Button>
            )} */}
            {!openEdit && initialData?.images.length < 6 && (
              <Button
                className=""
                variant={"outline"}
                onClick={() => setOpenEdit(true)}
                disabled={isLoading}
              >
                <PlusCircle className="size-5" /> Add an image
              </Button>
            )}
          </div>
          {!openEdit && (
            <div>
              {(initialData?.images.length ?? 0) > 0 ? (
                <div className="relative aspect-video mt-2">
                  <Image
                    src={initialData?.images[coverImage].url}
                    alt="uploaded image"
                    fill
                    className="rounded-md object-cover"
                  />
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="absolute bottom-1 right-1"
                    onClick={() =>
                      handleSetCoverImg(initialData.images[coverImage].id)
                    }
                  >
                    set cover image
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <ImageIcon className="h-10 w-10 text-slate-500" />
                  </div>
                  <span className="text-xs text-center text-destructive mx-auto">
                    Please insert at least one product image!
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        {openEdit && (
          <div className="">
            <FileUpload
              endpoint="productImage"
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4 text-center">
              Upload up to 6 product images. Select one image as the cover.
            </div>
          </div>
        )}
        {initialData?.images.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-2">
              {initialData?.images.map((imageUrl, index) => (
                <div
                  key={imageUrl.id}
                  onClick={() => setCoverImage(index)}
                  className={cn(
                    "relative mt-2 w-24 h-16",
                    coverImage === index &&
                      "border-2 border-teal-500 rounded-md"
                  )}
                >
                  <Image
                    src={imageUrl.url}
                    alt="uploaded image"
                    fill
                    className="rounded-md object-cover"
                  />
                  <span
                    className="text-red-500 absolute top-1 right-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(imageUrl.id);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </span>
                </div>
              ))}
            </div>
            <div className="text-xs text-muted-foreground mt-4 text-center">
              If no cover image is selected, the first image will be used as the
              cover.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
