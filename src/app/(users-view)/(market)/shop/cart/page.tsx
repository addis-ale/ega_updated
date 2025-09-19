import { CartView } from "@/app/modules/market/cart/ui/views/cart-view";

const CartPage = () => {
  return (
    <div className="mt-40">
      <h1 className="text-center text-2xl md:text-3xl font-bold">
        Items in Your Cart
      </h1>{" "}
      <CartView />
    </div>
  );
};

export default CartPage;
