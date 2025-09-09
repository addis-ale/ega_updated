"use client";

import { DataTable } from "@/components/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { columns } from "../components/column";
import { EmptyState } from "@/components/empty-state";
import { DataPagination } from "@/components/data-pagination";
import { useProductsFilter } from "@/hooks/use-products-filter";

export const ProductsView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useProductsFilter();
  const { data: myProducts } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({ ...filters })
  );
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 mt-8">
      <DataTable columns={columns} data={myProducts.items} />
      <DataPagination
        page={filters.page}
        totalPages={myProducts.totalPage}
        onPageChange={(page) => setFilters({ page })}
      />
      {myProducts.items.length === 0 && (
        <EmptyState
          title="Create your first product"
          description="You don’t have any products yet. Start by creating your first product and list it in your store."
        />
      )}
    </div>
  );
};
