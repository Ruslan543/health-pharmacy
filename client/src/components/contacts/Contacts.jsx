import Map from "../map/Map";
import styles from "./Contacts.module.scss";

function Contacts() {
  return (
    <section id="contacts" className={styles.contacts}>
      <h2 className="heading-secondary">Контактная информация</h2>

      <div className={styles.mapBox}>
        <Map classNames={{ map: styles.map }} />

        <div className={styles.box}>
          <div className={styles.address}>
            <img
              className={styles.iconAddress}
              src="/icon-navigate.svg"
              alt="Значок навигации"
            />

            <span className={styles.addressName}>
              г. Гомель, ул. Речицкий проспект 135
            </span>
          </div>

          <div className={styles.phone}>
            <img
              className={styles.iconPhone}
              src="/icon-phone.svg"
              alt="Значок телефона"
            />

            <span className={styles.phoneNumber}>+375 (44) 123-45-67</span>
          </div>

          <div className={styles.operationMode}>
            <p className={styles.operationModeTitle}>Режим работы</p>
            <p>Круглосуточно</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
