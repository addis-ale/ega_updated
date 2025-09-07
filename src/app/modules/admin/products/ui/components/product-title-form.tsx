"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { insertProductTitleSchema } from "../../schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useState } from "react";
import { PenIcon } from "lucide-react";
interface Props {
  initialData?: {
    name: string;
  };
  productId?: string;
}
export const ProductTitleForm = ({ initialData, productId }: Props) => {
  const isEdit = !!initialData && !!productId;
  const [openEdit, setOpenEdit] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof insertProductTitleSchema>>({
    resolver: zodResolver(insertProductTitleSchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });
  const createProduct = useMutation(
    trpc.products.create.mutationOptions({
      onSuccess: async (data) => {
        // TODO: invalidate some queries get Many
        toast.success("Product name created!");
        router.push(`/admin/products/new/${data.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const updateProductName = useMutation(
    trpc.products.update.mutationOptions({
      onSuccess: async () => {
        //TODO: invalidate queries getMany
        if (productId) {
          await queryClient.invalidateQueries(
            trpc.products.getOne.queryOptions({
              productId,
            })
          );
        }
        toast.success("Product Name Updated!");
        setOpenEdit(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const isLoading = createProduct.isPending || updateProductName.isPending;
  const onSubmit = (data: z.infer<typeof insertProductTitleSchema>) => {
    if (isEdit) {
      updateProductName.mutate({
        name: data.name,
        id: productId,
      });
    } else
      createProduct.mutate({
        name: data.name,
      });
  };
  if (isEdit) {
    return (
      <div className="bg-sidebar-border p-3 ">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-md">Product Name</h3>
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
              <span className="text-muted-foreground text-md">
                {initialData.name}
              </span>
            )}
          </div>
          {openEdit && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="text"
                          placeholder="e.g. Advanced Web Development"
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
  } else
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col space-y-8 max-w-xl"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-4">
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. Uno Card Game"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="leading-relaxed">
                  Give your product a clear and recognizable title. This will
                  help customers quickly identify it.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-x-4 items-center">
            <Button
              disabled={isLoading}
              asChild
              type="button"
              variant={"ghost"}
            >
              <Link href={"/admin/products"}>Cancel</Link>
            </Button>

            <Button disabled={isLoading} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    );
};
