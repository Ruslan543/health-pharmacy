import styles from "./AboutSection.module.scss";

function AboutSection() {
  return (
    <section className={styles.about}>
      <h2 className="heading-secondary">О нас</h2>
      <p className={styles.text}>
        HEALTH pharmacy – это аптека в которой можно забронировать или заказать
        лекарства. Множество серцифицированных препаратов и доступные цены.
      </p>
    </section>
  );
}

export default AboutSection;
