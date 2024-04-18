import ListProducts from "./ListProducts";
import styles from "./styles/ProductsSection.module.scss";

function ProductsSection() {
  return (
    <section className={styles.products}>
      <h2 className={`heading-secondary ${styles.headingSecondary}`}>
        Продукция
      </h2>

      <ListProducts />

      <div className={styles.pagination}>
        <button className={`btn-primary ${styles.btnPaginate}`}>
          Предыдущая
        </button>
        <p className={styles.pages}>1 из 5</p>
        <button className={`btn-primary ${styles.btnPaginate}`}>
          Следующая
        </button>
      </div>
    </section>
  );
}

export default ProductsSection;
