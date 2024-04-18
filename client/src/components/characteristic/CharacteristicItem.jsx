import PropTypes from "prop-types";
import styles from "./Characteristic.module.scss";

function CharacteristicItem({ characteristic }) {
  const { image, imageAlt, title, text } = characteristic;

  return (
    <li className={styles.item}>
      <img className={styles.icon} src={image} alt={imageAlt} />
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
    </li>
  );
}

CharacteristicItem.propTypes = {
  characteristic: PropTypes.object,
};

export default CharacteristicItem;
