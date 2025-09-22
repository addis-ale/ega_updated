import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type ProductLists =
  inferRouterOutputs<AppRouter>["productItems"]["getMany"]["items"];
