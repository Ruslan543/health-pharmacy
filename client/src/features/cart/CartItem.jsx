import PropTypes from "prop-types";
import styles from "./styles/CartItem.module.scss";

function CartItem({ product }) {
  const {
    quantity,
    product: { imageUrl, name, price },
  } = product;

  return (
    <div className={styles.item}>
      <img className={styles.photo} src={imageUrl} alt="Фотография препарата" />
      <p className={styles.count}>1x</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{price} BYN</p>

      <div className={styles.quantityBox}>
        <button className={`btn-primary ${styles.button}`}>–</button>
        <p className={styles.quantity}>{quantity}</p>
        <button className={`btn-primary ${styles.button}`}>+</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  product: PropTypes.object,
};

export default CartItem;
