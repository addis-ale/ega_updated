import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}
const formSchema = z.object({
  telegramUsername: z
    .string()
    .min(1, { message: "Username is required to checkout." })
    .refine((val) => val.startsWith("@"), {
      message: "Telegram username must start with '@'",
    }),
});
export const CheckoutForm = ({ onCancel, onSuccess }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      telegramUsername: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //TODO: send the invoice to telegram bot
    console.log(values);
    if (onSuccess) onSuccess();
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="telegramUsername"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="@yourusername" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button variant="ghost" type="button" onClick={() => onCancel()}>
              Cancel
            </Button>
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
