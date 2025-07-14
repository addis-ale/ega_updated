import ShopNavbar from "@/components/shop/ShopNavbar";

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
