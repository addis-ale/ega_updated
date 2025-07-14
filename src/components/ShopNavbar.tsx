import { Heart, ShoppingCart } from "lucide-react";
import SearchInput from "./SearchInput";
import Link from "next/link";

const ShopNavbar = () => {
  return (
    <div className="flex mt-4 ">
      <div className="flex gap-6 lg:gap-8 ml-auto items-center">
        <SearchInput />
        <Link href={"/shop/favorite"}>
          <Heart />
        </Link>
        <Link href={"/shop/cart"} className="relative">
          <ShoppingCart />
          <div className=" absolute -top-5 -right-3 flex items-center justify-center p-2 w-6 h-6 rounded-full border border-muted text-sm ">
            2
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShopNavbar;
