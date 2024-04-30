import PropTypes from "prop-types";
import styles from "./styles/ProductItem.module.scss";
import { useUpdateQuantity } from "../cart/useUpdateQuantity";

function ProductItem({ product }) {
  const { updateQuantity, isPending } = useUpdateQuantity();

  const { image, name, price, quantity, userBasket } = product;
  const quantityProduct = userBasket ? userBasket.quantity : 0;

  const isDisableIncrement = isPending || quantity === 0;
  const isDisableDecrement = isPending || quantityProduct === 0;

  function handleIncrement() {
    updateQuantity({
      type: "increment",
      product,
      productBasket: product.userBasket,
      quantityProduct,
    });
  }

  function handleDecrement() {
    updateQuantity({
      type: "decrement",
      product,
      productBasket: product.userBasket,
      quantityProduct,
    });
  }

  return (
    <div className={styles.item}>
      <div className={styles.imageBox}>
        <img className={styles.image} src={image} alt="Фотография лекарства" />
      </div>

      <div className={styles.details}>
        <p className={styles.title}>{name}</p>
        <p className={styles.price}>{price} BYN</p>

        <div className={styles.quantityBox}>
          <button
            className={styles.btnQuantity}
            onClick={handleDecrement}
            disabled={isDisableDecrement}
          >
            –
          </button>
          <p className={styles.quantity}>{quantityProduct}</p>
          <button
            className={styles.btnQuantity}
            onClick={handleIncrement}
            disabled={isDisableIncrement}
          >
            +
          </button>
        </div>

        <p className={styles.textOnlyLeft}>Всего осталось: {quantity}</p>

        {userBasket ? (
          <p className={`${styles.textAdded}`}>Товар в корзине</p>
        ) : (
          <button
            className={`btn-primary ${styles.btnPrimary}`}
            onClick={handleIncrement}
            // disabled={isPending}
          >
            Добавить в корзину
          </button>
        )}

        {/* <button className={`btn-primary ${styles.btnPrimary}`}>
          Добавить в корзину
        </button> */}
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
