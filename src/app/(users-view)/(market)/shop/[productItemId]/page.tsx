import { ProductDetailView } from "@/app/modules/market/shop/ui/views/product-detail-view";

interface Props {
  params: Promise<{ productItemId: string }>;
}

export default async function ProductDetail({ params }: Props) {
  const { productItemId } = await params;
  console.log("id", productItemId);
  return <ProductDetailView />;
}
