"use client";

import { DataTable } from "@/components/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { columns } from "../components/column";
import { EmptyState } from "@/components/empty-state";

export const ProductsView = () => {
  const trpc = useTRPC();
  const { data: myProducts } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({})
  );
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 mt-8">
      <DataTable columns={columns} data={myProducts.items} />

      {myProducts.items.length === 0 && (
        <EmptyState
          title="Create your first product"
          description="You don’t have any products yet. Start by creating your first product and list it in your store."
        />
      )}
    </div>
  );
};
