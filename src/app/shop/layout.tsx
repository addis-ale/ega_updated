const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>nav</div>
      <main>{children}</main>
    </div>
  );
};

export default ShopLayout;
