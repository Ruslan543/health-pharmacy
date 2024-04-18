import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import styles from "./styles/Account.module.scss";

function AccountSection({ children }) {
  return (
    <section className={styles.cabinet}>
      <div className={styles.photoBox}>
        <img
          className={styles.photo}
          src="/default-user.jpg"
          alt="Фотография пользователя"
        />
        <button className={styles.btnChange}>Изменить фотографию</button>
      </div>

      <div className={styles.data}>{children}</div>

      <Sidebar />
    </section>
  );
}

AccountSection.propTypes = {
  children: PropTypes.object,
};

export default AccountSection;
