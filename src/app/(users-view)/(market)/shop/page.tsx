import { loadSearchParams } from "@/app/modules/admin/products/hooks/params";
import { ShopView } from "@/app/modules/market/shop/ui/views/shop-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
interface Props {
  filter: Promise<SearchParams>;
}
const ShopPage = async ({ filter }: Props) => {
  const { search, catIds, minPrice, maxPrice, rentOrSale } =
    await loadSearchParams(filter);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.productItems.getMany.queryOptions({
      search,
      categoryIds: catIds,
      minPrice,
      maxPrice,
      type: rentOrSale,
    })
  );
  return <ShopView />;
};

export default ShopPage;
