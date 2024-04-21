import PropTypes from "prop-types";
import styles from "./styles/ProductItem.module.scss";

function ProductItem({ product }) {
  const { imageUrl, name, price, quantity } = product;

  return (
    <div className={styles.item}>
      <div className={styles.imageBox}>
        <img
          className={styles.image}
          src={imageUrl}
          alt="Фотография лекарства"
        />
      </div>

      <div className={styles.details}>
        <p className={styles.title}>{name}</p>
        <p className={styles.price}>{price} BYN</p>

        <div className={styles.quantityBox}>
          <button className={styles.btnQuantity}>–</button>
          <p className={styles.quantity}>{quantity}</p>
          <button className={styles.btnQuantity}>+</button>
        </div>

        <button className={`btn-primary ${styles.btnPrimary}`}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
