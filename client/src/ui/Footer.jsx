import styles from "./styles/Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoBox}>
        <img
          className={styles.logo}
          src="/logo.svg"
          alt="Фотография логотипа"
        />

        <p className={styles.copyright}>
          Copyright © 2023 by HEALTH, Inc. All rights reserved.
        </p>
      </div>

      <ul className={`${styles.list} ${styles.list_1}`}>
        <li className={styles.item}>Связаться с нами</li>
        <li className={styles.item}>г. Гомель, ул. Речицкий проспект 135</li>
        <li className={styles.item}>+375 (44) 123-45-67</li>
        <li className={styles.item}>hello@health.com</li>
      </ul>

      <ul className={`${styles.list} ${styles.list_2}`}>
        <li className={styles.item}>Аккаунт</li>
        <li className={styles.item}>Создать аккаунт</li>
        <li className={styles.item}>Войти</li>
        <li className={styles.item}>IOS приложение</li>
        <li className={styles.item}>Android приложение</li>
      </ul>

      <ul className={`${styles.list} ${styles.list_3}`}>
        <li className={styles.item}>Компания</li>
        <li className={styles.item}>Об HEALTH</li>
        <li className={styles.item}>Для бизнес</li>
        <li className={styles.item}>Работа</li>
      </ul>

      <ul className={`${styles.list} ${styles.list_4}`}>
        <li className={styles.item}>Ресурсы</li>
        <li className={styles.item}>Католог лекарств</li>
        <li className={styles.item}>Справочный центр</li>
        <li className={styles.item}>Конфиденциальность и условия</li>
      </ul>
    </footer>
  );
}

export default Footer;
