import { productLists } from "@/constants";
import { ProductCarousal } from "./product-carousal";
import { ProductDetailDescription } from "./product-detail-description";
import { ProductCard } from "./product-card";
export const ProductDetailBrowser = () => {
  return (
    <div className="mt-44 md:mt-48">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-6 ">
          {/* image */}
          <div className="flex-1">
            <ProductCarousal />
          </div>
          {/* description */}
          <div className="flex-1">
            <ProductDetailDescription />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-8 md:gap-12">
            <h1 className="text-4xl lg:text-5xl">Related products</h1>
            <div className="grid grid-cols-6 gap-4">
              {productLists.map((list) => (
                <div key={list.productId} className="col-span-3 md:col-span-2 ">
                  <ProductCard product={list} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
