import { Link } from "react-router-dom";
import styles from "./styles/PageNotFound.module.scss";

function PageNotFound() {
  return (
    <div className={styles.section}>
      <p className={styles.textError}>:(</p>
      <p className={styles.textError}>Ошибка 404!</p>

      <p className={styles.text}>
        Страница не найдена!{" "}
        <Link to="/" className={styles.link}>
          Вернуться на главную
        </Link>
      </p>
    </div>
  );
}

export default PageNotFound;
