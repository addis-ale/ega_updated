"use client";
import { z } from "zod";
import { ArrowLeftCircle, OctagonAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
type FieldName = "name" | "email" | "password" | "confirmPassword";
const formFields: Array<{
  name: FieldName;
  formLabel: string;
  inputType: string;
  inputPlaceholder: string;
}> = [
  {
    name: "name",
    formLabel: "Name",
    inputType: "text",
    inputPlaceholder: "Enter your name",
  },
  {
    name: "email",
    formLabel: "Email",
    inputType: "email",
    inputPlaceholder: "Enter your email",
  },
  {
    name: "password",
    formLabel: "Password",
    inputType: "password",
    inputPlaceholder: "Enter your password",
  },
  {
    name: "confirmPassword",
    formLabel: "Confirm Password",
    inputType: "password",
    inputPlaceholder: "Confirm your password",
  },
];
const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is Required" }),
    confirmPassword: z.string().min(1, { message: "password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });
export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setError(error.message);
          setPending(false);
        },
      }
    );
  };
  const onSocial = (provider: "google" | "github") => {
    setError(null);
    setPending(true);
    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setError(error.message);
          setPending(false);
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <Link href={"/"}>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <ArrowLeftCircle className="w-5 h-5" />
                      EGA
                    </Button>
                  </Link>
                  <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
                  <p className="text-muted-foreground text-balance">
                    Create account
                  </p>
                </div>
                {formFields.map((item) => (
                  <div className="grid gap-3" key={item.name}>
                    <FormField
                      control={form.control}
                      name={item.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.formLabel}</FormLabel>
                          <FormControl>
                            <Input
                              type={item.inputType}
                              placeholder={item.inputPlaceholder}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                {error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlert className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={pending}>
                  Sign Up
                </Button>
                <div className=" relative text-center text-sm after:flex after:items-center after:absolute after:inset-0 after:top-1/2 after:border-border after:border-t after:z-0">
                  <span className="px-2 z-10 bg-card text-muted-foreground relative">
                    Or continue with
                  </span>
                </div>

                <div className="flex items-center">
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full"
                    onClick={() => onSocial("google")}
                    disabled={pending}
                  >
                    <FcGoogle />
                    Google
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href={"/sign-in"}
                    className="underline underline-offset-4 text-blue-600"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-[url('https://uaxmj7uver.ufs.sh/f/rZEehYPlP8SXBpm92uSFWAQGNyrV4lvLe5s03SYUEZciImkJ')] bg-cover bg-center bg-no-repeat relative hidden md:flex flex-col gap-y-4 items-center justify-center"></div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to out{" "}
        <a href="" className="text-blue-500">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="" className="text-blue-500">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};
