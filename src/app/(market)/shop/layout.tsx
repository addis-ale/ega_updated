import { ShopNavbar } from "@/app/modules/shop/ui/components/shop-navbar";

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
