import PropTypes from "prop-types";

import InputBox from "../account/InputBox";
import styles from "../account/styles/FormAccount.module.scss";
import stylesLoginForm from "./styles/LoginForm.module.scss";

function LoginForm() {
  return (
    <form className={`${stylesLoginForm.formData} ${styles.formData}`}>
      <InputBox name="E-mail" htmlFor="email">
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          placeholder="Введите e-mail"
        />
      </InputBox>

      <InputBox name="Пароль" htmlFor="password">
        <input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
        />
      </InputBox>

      <button className={`btn-primary ${styles.btnSave}`}>Войти</button>
    </form>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
