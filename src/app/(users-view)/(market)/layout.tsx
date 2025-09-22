import { Suspense } from "react";
import { ShopNavbar } from "@/app/modules/market/shop/ui/components/shop-navbar";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading navbar...</div>}>
        <ShopNavbar />
      </Suspense>
      <main>{children}</main>
    </div>
  );
};

export default ShopLayout;
