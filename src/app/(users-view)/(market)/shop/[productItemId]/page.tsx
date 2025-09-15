import { ProductDetailView } from "@/app/modules/market/shop/ui/views/product-detail-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ productItemId: string }>;
}

export default async function ProductDetail({ params }: Props) {
  const { productItemId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.productItems.getOne.queryOptions({
      productId: productItemId,
    })
  );
  return <ProductDetailView productId={productItemId} />;
}
