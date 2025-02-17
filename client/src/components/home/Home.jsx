import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.content}>
        <h1 className="heading-primary">Качественные препараты каждый день</h1>

        <p className={styles.subtitle}>
          Health pharmacy – это аптека с качественной продукцией, которую можно
          забронировать прямо на сайте!
        </p>

        <Link to="/products" className={`btn-primary ${styles.btn}`}>
          Посмотреть препараты
        </Link>
      </div>

      <div className={styles.imageBox}>
        <img
          className={styles.image}
          src="/medicaments.png"
          alt="Фотография лекарств"
        />
      </div>
    </section>
  );
}

export default Home;
