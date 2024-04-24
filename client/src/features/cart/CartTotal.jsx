import styles from "./styles/CartTotal.module.scss";
import { useCart } from "./useCart";

function CartTotal() {
  const { cart } = useCart();
  const { totalNum, totalSum } = cart.products.reduce(
    (acc, product) => {
      const totalSum = product.product.price * product.quantity;
      return {
        ...acc,
        totalNum: acc.totalNum + product.quantity,
        totalSum: acc.totalSum + totalSum,
      };
    },
    {
      totalNum: 0,
      totalSum: 0,
    }
  );

  return (
    <div className={styles.cartTotal}>
      <div className={styles.total}>
        <p className={styles.text}>Всего:</p>
        <p className={styles.quantity}>{totalNum} товара</p>
      </div>

      <div className={styles.total}>
        <p className={styles.text}>Итого:</p>
        <p className={styles.quantity}>{totalSum.toFixed(2)} BYN</p>
      </div>

      <button className={`btn-primary ${styles.button}`}>Оформить заказ</button>
    </div>
  );
}

export default CartTotal;
