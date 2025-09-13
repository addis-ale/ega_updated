import { ShopView } from "@/app/modules/market/shop/ui/views/shop-view";
import { getQueryClient, trpc } from "@/trpc/server";

const ShopPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.productItems.getMany.queryOptions({}));
  return <ShopView />;
};

export default ShopPage;
