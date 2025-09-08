"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { PenIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTRPC } from "@/trpc/client";
import { insertCategorySchema } from "../../schema";
import { Combobox } from "@/components/ui/combobox";
interface Props {
  initialData: {
    categoryId: string;
  };
  productId: string;
  options: { label: string; value: string }[];
}

export const ProductCategoryForm = ({
  initialData,
  productId,
  options,
}: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const form = useForm<z.infer<typeof insertCategorySchema>>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: {
      categoryId: initialData?.categoryId ?? "",
    },
  });
  const onSubmit = (data: z.infer<typeof insertCategorySchema>) => {
    updateProduct.mutate({ ...data, id: productId });
  };

  const updateProduct = useMutation(
    trpc.products.update.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries get many products
        if (productId)
          await queryClient.invalidateQueries(
            trpc.products.getOne.queryOptions({ productId })
          );
        setOpenEdit(false);
        toast.success("Product category updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const selectedOption = options.find(
    (option) => option.value === initialData?.categoryId
  );
  const isLoading = updateProduct.isPending;

  return (
    <div className="bg-sidebar-border p-3 ">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">Product Category</h3>
            {openEdit ? (
              <Button
                variant={"outline"}
                onClick={() => setOpenEdit(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            ) : (
              <Button
                className=""
                variant={"outline"}
                onClick={() => setOpenEdit(true)}
                disabled={isLoading}
              >
                <PenIcon className="size-5" /> Edit
              </Button>
            )}
          </div>
          {!openEdit && (
            <div>
              {!!initialData?.categoryId ? (
                <span className="text-muted-foreground text-md">
                  {selectedOption?.label}
                </span>
              ) : (
                <span className="text-muted-foreground text-md italic">
                  No Category
                </span>
              )}
            </div>
          )}
        </div>
        {openEdit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <FormControl>
                      <Combobox options={options} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                Save
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};
