import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type BlogData = inferRouterOutputs<AppRouter>["blogs"]["getMany"];
