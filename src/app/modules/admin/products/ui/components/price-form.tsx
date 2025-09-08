"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { insertPriceSchema } from "../../schema";
import { formatPrice } from "@/lib/price-format";

interface Props {
  initialData: {
    sellingPrice?: string;
    rentalPrice?: string;
  };
  productId: string;
  fieldName: "sellingPrice" | "rentalPrice";
  label?: string;
}

export const ProductPriceForm = ({
  initialData,
  productId,
  fieldName,
  label,
}: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);

  const form = useForm<z.infer<typeof insertPriceSchema>>({
    resolver: zodResolver(insertPriceSchema),
    defaultValues: {
      price: initialData?.[fieldName] ?? "",
    },
  });

  const updateProductPrice = useMutation(
    trpc.products.update.mutationOptions({
      onSuccess: async () => {
        await Promise.all([
          //   queryClient.invalidateQueries(trpc.products.getAll.queryOptions({})),
          queryClient.invalidateQueries(
            trpc.products.getOne.queryOptions({ productId })
          ),
        ]);
        setOpenEdit(false);
        toast.success(`${label || "Price"} updated!`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const onSubmit = (data: z.infer<typeof insertPriceSchema>) => {
    updateProductPrice.mutate({ id: productId, [fieldName]: data.price });
  };

  const currentPrice = initialData?.[fieldName];
  const isLoading = updateProductPrice.isPending;
  return (
    <div className="bg-sidebar-border p-3">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">{label || "Price"}</h3>
            {openEdit ? (
              <Button
                variant="outline"
                onClick={() => setOpenEdit(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setOpenEdit(true)}
                disabled={isLoading}
              >
                <PenIcon className="h-5 w-5" /> Edit
              </Button>
            )}
          </div>

          {!openEdit && (
            <div>
              {currentPrice ? (
                <span className="text-muted-foreground text-md">
                  {formatPrice(Number(currentPrice))}
                </span>
              ) : (
                <span className="text-muted-foreground text-md italic">
                  No Price
                </span>
              )}
            </div>
          )}
        </div>

        {openEdit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label || "Price"}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        className="bg-white"
                        placeholder={`Set a ${
                          label?.toLowerCase() || "price"
                        } for this product`}
                        {...field}
                      />
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
