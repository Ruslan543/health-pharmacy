import styles from "./styles/CartTotal.module.scss";

function CartTotal() {
  return (
    <div className={styles.cartTotal}>
      <div className={styles.total}>
        <p className={styles.text}>Всего:</p>
        <p className={styles.quantity}>3 товара</p>
      </div>

      <div className={styles.total}>
        <p className={styles.text}>Итого:</p>
        <p className={styles.quantity}>14.56 BYN</p>
      </div>

      <button className={`btn-primary ${styles.button}`}>Оформить заказ</button>
    </div>
  );
}

export default CartTotal;
