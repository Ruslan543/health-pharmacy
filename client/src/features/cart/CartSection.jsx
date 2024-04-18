import CartList from "./CartList";
import CartTotal from "./CartTotal";
import styles from "./styles/CartSection.module.scss";

function CartSection() {
  return (
    <section className={styles.cart}>
      <h2 className={`heading-secondary ${styles.headingSecondary}`}>
        Корзина
      </h2>

      <CartList className={styles.list} />
      <CartTotal />
    </section>
  );
}

export default CartSection;
