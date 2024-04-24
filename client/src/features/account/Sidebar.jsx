import { NavLink } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import { useLogout } from "../authentication/useLogout";
import styles from "./styles/Sidebar.module.scss";

function Sidebar() {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        <li className={styles.item}>
          <NavLink to="/account" className={styles.link}>
            Профиль
          </NavLink>
        </li>

        <li className={styles.item}>
          <NavLink to="/settings" className={styles.link}>
            Настройки
          </NavLink>
        </li>

        {user.role === "admin" && (
          <li className={styles.item}>
            <NavLink to="/admin" className={styles.link}>
              Админ
            </NavLink>
          </li>
        )}

        <li className={styles.item}>
          <button className={styles.btnExit} onClick={logout}>
            Выйти
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
