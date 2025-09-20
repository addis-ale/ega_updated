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
import { Input } from "@/components/ui/input";
import { insertDiscountPercentageSchema } from "../../schema";
import { formatPercentage } from "@/lib/format-percent";
interface Props {
  initialData: {
    discountPercentage: string;
  };
  productId: string;
}

export const DiscountPercentagForm = ({ initialData, productId }: Props) => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);
  const form = useForm<z.infer<typeof insertDiscountPercentageSchema>>({
    resolver: zodResolver(insertDiscountPercentageSchema),
    defaultValues: {
      discountPercentage: initialData?.discountPercentage,
    },
  });
  const onSubmit = (data: z.infer<typeof insertDiscountPercentageSchema>) => {
    updateProductDiscount.mutate({
      discountPercentage: data.discountPercentage,
      id: productId,
    });
  };

  const updateProductDiscount = useMutation(
    trpc.products.update.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries get many courses
        if (productId)
          await Promise.all([
            // queryClient.invalidateQueries(
            //   trpc.products.getMyCourse.queryOptions({})
            // ),
            queryClient.invalidateQueries(
              trpc.products.getOne.queryOptions({ productId })
            ),
          ]);
        setOpenEdit(false);
        toast.success("Product Discount percentage updated!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const isLoading = updateProductDiscount.isPending;
  return (
    <div className="bg-sidebar-border p-3 ">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-md">Discount Percentage</h3>
              <span className="text-xs font-semibold text-destructive">
                Final price must already include this discount!
              </span>
            </div>
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
              {!!initialData?.discountPercentage &&
              initialData.discountPercentage !== "0.00" ? (
                <span className="text-muted-foreground text-md">
                  {formatPercentage(Number(initialData?.discountPercentage))}
                </span>
              ) : (
                <span className="text-muted-foreground text-md italic">
                  No Discount Applied
                </span>
              )}
            </div>
          )}
        </div>
        {openEdit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="discountPercentage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applied discount percentage</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={"3"}
                        className="bg-white"
                        placeholder="Set a dicount price percentage for your product"
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
