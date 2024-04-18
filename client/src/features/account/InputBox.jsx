import PropTypes from "prop-types";
import styles from "./styles/FormAccount.module.scss";

function InputBox({ name, htmlFor, children }) {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label} htmlFor={htmlFor}>
        {name}
      </label>

      {children}
    </div>
  );
}

InputBox.propTypes = {
  name: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.object,
};

export default InputBox;
