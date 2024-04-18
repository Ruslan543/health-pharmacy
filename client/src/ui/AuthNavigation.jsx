import { Link } from "react-router-dom";
import stylesNavigation from "./styles/Navigation.module.scss";
import styles from "./styles/AuthNavigation.module.scss";

function AuthNavigation() {
  return (
    <div className={`${stylesNavigation.auth} ${styles.authNavigation}`}>
      <Link to="/signup" className={styles.signup}>
        Регистрация
      </Link>

      <Link to="/login" className="btn-primary">
        Войти
      </Link>
    </div>
  );
}

export default AuthNavigation;
