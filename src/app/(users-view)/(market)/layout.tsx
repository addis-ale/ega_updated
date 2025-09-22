import { ShopNavbar } from "@/app/modules/market/shop/ui/components/shop-navbar";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <ShopNavbar />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default ShopLayout;
