import { Link } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

import Search from "../features/search/Search";
import AuthNavigation from "./AuthNavigation";
import UserNavigation from "./UserNavigation";
import styles from "./styles/Navigation.module.scss";

function Navigation() {
  const { user } = useUser();

  function handleScroll(elementId) {
    return () => {
      setTimeout(() => {
        document.getElementById(elementId).scrollIntoView({
          behavior: "smooth",
        });
      });
    };
  }

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
          <Link
            to="/"
            className={styles.link}
            onClick={handleScroll("contacts")}
          >
            Контакты
          </Link>
        </li>
      </ul>

      <Search />

      {!user && <AuthNavigation />}
      {user && <UserNavigation />}
    </nav>
  );
}

export default Navigation;
