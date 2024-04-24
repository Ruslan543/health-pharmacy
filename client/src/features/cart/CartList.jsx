import PropTypes from "prop-types";
import styles from "./styles/CartList.module.scss";
import CartItem from "./CartItem";
import { useCart } from "./useCart";

function CartList({ className }) {
  const { cart } = useCart();

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
