import PropTypes from "prop-types";
import { useCart } from "./useCart";

import CartItem from "./CartItem";
import styles from "./styles/CartList.module.scss";

function CartList({ className }) {
  const { cart } = useCart();

  if (!cart) return null;

  if (!cart.products.length) {
    return <p className={styles.textNoProducts}>В корзине нет товаров!</p>;
  }

  return (
    <div className={`${className} ${styles.list}`}>
      {cart.products.map((product) => (
        <CartItem product={product} key={product._id} />
      ))}
    </div>
  );
}

CartList.propTypes = {
  className: PropTypes.string,
};

export default CartList;
