"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { insertProductTitleSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
export const ProductTitleForm = () => {
  const form = useForm<z.infer<typeof insertProductTitleSchema>>({
    resolver: zodResolver(insertProductTitleSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = (data: z.infer<typeof insertProductTitleSchema>) => {
    console.log(data);
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
              <FormDescription className="leading-relaxed">
                Give your product a clear and recognizable title. This will help
                customers quickly identify it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-x-4 items-center">
          <Link href={"/admin/products"}>
            <Button className="" type="button" variant={"ghost"}>
              Cancel
            </Button>
          </Link>

          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
};
