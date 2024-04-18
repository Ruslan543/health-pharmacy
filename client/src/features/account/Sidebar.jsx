import { NavLink } from "react-router-dom";
import styles from "./styles/Sidebar.module.scss";

function Sidebar() {
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

        <li className={styles.item}>
          <button className={styles.btnExit}>Выйти</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
