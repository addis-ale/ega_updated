import { ProductFilter } from "./product-filter";
import { ProductList } from "./product-list";

export const ProductBrowse = () => {
  return (
    <div className="flex md:w-full justify-between mt-8 md:mt-12">
      {/* filter */}
      <div className="md:w-1/3 hidden md:block mr-2">
        <ProductFilter />
      </div>
      {/* list */}
      <div className="md:w-2/3">
        <ProductList />
      </div>
    </div>
  );
};
