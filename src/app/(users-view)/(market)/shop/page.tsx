import { ShopView } from "@/app/modules/market/shop/ui/views/shop-view";
import { getQueryClient, trpc } from "@/trpc/server";

const ShopPage = () => {
  const queryClient = getQueryClient();
  //void queryClient.prefetchQuery()
  return <ShopView />;
};

export default ShopPage;
