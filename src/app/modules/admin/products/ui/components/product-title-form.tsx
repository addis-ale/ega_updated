"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
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
export const ProductTitleForm = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const form = useForm<z.infer<typeof insertProductTitleSchema>>({
    resolver: zodResolver(insertProductTitleSchema),
    defaultValues: {
      title: "",
    },
  });
  const createProduct = useMutation(
    trpc.products.create.mutationOptions({
      onSuccess: async (data) => {
        // TODO: invalidate some queries get products
        toast.success("Product name created!");
        router.push(`/admin/products/new/${data.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const isLoading = createProduct.isPending;
  const onSubmit = (data: z.infer<typeof insertProductTitleSchema>) => {
    createProduct.mutate({
      name: data.title,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col space-y-8 max-w-xl"
      >
        <FormField
          name="title"
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
                Give your product a clear and recognizable title. This will help
                customers quickly identify it.
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-x-4 items-center">
          <Button disabled={isLoading} asChild type="button" variant={"ghost"}>
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
