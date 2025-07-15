import ProductDetailBrowser from "@/components/shop/ProductDetailBrowser";

interface ProductDetailProps {
  params: { id: string };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const id = params.id; // ✅ This now works correctly
  console.log("Product ID:", id);

  return (
    <div className="">
      <ProductDetailBrowser />
    </div>
  );
}
