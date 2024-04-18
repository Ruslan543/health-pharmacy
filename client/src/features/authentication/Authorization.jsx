import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./styles/Authorization.module.scss";

function Authorization({ children, type = "login" }) {
  return (
    <section className={styles.authorization}>
      <div className={styles.logoBox}>
        <Link to="/" className={styles.logoLink}>
          <img className={styles.logo} src="/logo.svg" alt="Логотип компании" />
        </Link>
      </div>

      {children}

      <div className={styles.auth}>
        <p className={styles.text}>
          {type === "login" && (
            <>
              Нет аккаунта?
              <Link to="/signup" className={styles.btnAuth}>
                Зарегистрироваться
              </Link>
            </>
          )}

          {type === "signup" && (
            <>
              Есть аккаунт?
              <Link to="/login" className={styles.btnAuth}>
                Войти
              </Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

Authorization.propTypes = {
  children: PropTypes.object,
  type: PropTypes.string,
};

export default Authorization;
