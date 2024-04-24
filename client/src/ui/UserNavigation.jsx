import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

import styles from "./styles/UserNavigation.module.scss";
import stylesNavigation from "./styles/Navigation.module.scss";

function UserNavigation() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className={`${stylesNavigation.user} ${styles.userNavigation}`}>
      <div className={styles.basket} onClick={() => navigate("/cart")}>
        <svg className={styles.icon}>
          <use xlinkHref="/sprite.svg#icon-shopping-cart"></use>
        </svg>
      </div>

      <div className={styles.userBox} onClick={() => navigate("/account")}>
        <p className={styles.name}>{user.name}</p>
        <img
          className={styles.avatar}
          src="/default-user.jpg"
          alt="Фотография пользователя"
        />
      </div>
    </div>
  );
}

export default UserNavigation;
