"use client";

import { ProductBrowse } from "../components/product-browse";
import { ShopHero } from "../components/shop-hero";

export const ShopView = () => {
  return (
    <div className="flex flex-col gap-12">
      <ShopHero />
      <ProductBrowse />
    </div>
  );
};
