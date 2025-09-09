import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type GetMany =
  inferRouterOutputs<AppRouter>["products"]["getMany"]["items"];
