import { Link } from "react-router-dom";

import Search from "../features/Search";
import AuthNavigation from "./AuthNavigation";
import styles from "./styles/Navigation.module.scss";

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link to="/" className={styles.logoLink}>
        <img className={styles.logo} src="/logo.svg" alt="Логотип компании" />
      </Link>

      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/about" className={styles.link}>
            О нас
          </Link>
        </li>

        <li className={styles.item}>
          <Link to="/products" className={styles.link}>
            Продукция
          </Link>
        </li>

        <li className={styles.item}>
          <Link to="#contacts" className={styles.link}>
            Контакты
          </Link>
        </li>
      </ul>

      <Search />
      <AuthNavigation />
    </nav>
  );
}

export default Navigation;
