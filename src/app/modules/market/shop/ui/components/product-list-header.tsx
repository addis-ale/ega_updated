import { MobileFilter } from "./mobile-filter";
import { ShopListHeader } from "./shop-list-header";

export const ProductListHeader = () => {
  return (
    <div className="grid grid-cols-6 items-center sticky top-36 z-30 bg-background pt-10 pb-5">
      <div className="col-span-2">
        <ShopListHeader />
      </div>

      <div className="col-start-5 md:col-start-6 col-span-2">
        <div className="md:hidden">
          <MobileFilter />
        </div>
      </div>
    </div>
  );
};
