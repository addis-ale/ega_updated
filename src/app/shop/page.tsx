import ProductBrowse from "@/components/shop/ProductBrowse";
import ShopHero from "@/components/shop/ShopHero";

const ShopPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <ShopHero />
      <ProductBrowse />
    </div>
  );
};

export default ShopPage;
