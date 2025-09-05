import { ProductDetailView } from "@/app/modules/shop/ui/views/product-detail-view";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  console.log("id", id);
  return <ProductDetailView />;
}
