import PropTypes from "prop-types";
import { useUpdateQuantity } from "./useUpdateQuantity";
import styles from "./styles/CartItem.module.scss";

function CartItem({ product }) {
  const { updateQuantity, isPending } = useUpdateQuantity();
  const {
    quantity,
    product: { image, name, price },
  } = product;

  const isDisableIncrement = isPending || product.product.quantity === 0;
  const isDisableDecrement = isPending || quantity === 0;

  function handleIncrement() {
    updateQuantity({
      type: "increment",
      product: product.product,
      productBasket: product,
      quantityProduct: quantity,
    });
  }

  function handleDecrement() {
    updateQuantity({
      type: "decrement",
      product: product.product,
      productBasket: product,
      quantityProduct: quantity,
    });
  }

  return (
    <div className={styles.item}>
      <img className={styles.photo} src={image} alt="Фотография препарата" />
      <p className={styles.count}>1x</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{price} BYN</p>

      <div className={styles.quantityBox}>
        <button
          className={`btn-primary ${styles.button}`}
          onClick={handleDecrement}
          disabled={isDisableDecrement}
        >
          –
        </button>
        <p className={styles.quantity}>{quantity}</p>
        <button
          className={`btn-primary ${styles.button}`}
          onClick={handleIncrement}
          disabled={isDisableIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  product: PropTypes.object,
};

export default CartItem;
