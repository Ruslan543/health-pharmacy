import { useEffect } from "react";
import CartSection from "../features/cart/CartSection";

function Cart() {
  useEffect(function () {
    document.title = "HEALTH pharmacy | Корзина";
  }, []);

  return <CartSection />;
}

export default Cart;
