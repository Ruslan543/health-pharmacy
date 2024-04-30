import { useEffect } from "react";
import { useUser } from "../authentication/useUser";
import { useSettingsReducer } from "./useSettingsReducer";

import InputBox from "../account/InputBox";
import styles from "../account/styles/FormAccount.module.scss";

function FormSettings() {
  const { user } = useUser();
  const { state, actions } = useSettingsReducer();

  useEffect(
    function () {
      actions.init({ email: user.email });
    },
    [actions, user.email]
  );

  return (
    <form className={styles.formData}>
      <InputBox name="E-mail" htmlFor="email">
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          placeholder="Введите e-mail"
          value={state.email}
          onChange={(event) => actions.setEmail(event.target.value)}
        />
      </InputBox>

      <InputBox name="Пароль" htmlFor="password">
        <input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={state.password}
          onChange={(event) => actions.setPassword(event.target.value)}
        />
      </InputBox>

      <InputBox name="Подтвердите пароль" htmlFor="passwordConfirm">
        <input
          className={styles.input}
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="Введите пароль повторно"
          value={state.passwordConfirm}
          onChange={(event) => actions.setPasswordConfirm(event.target.value)}
        />
      </InputBox>

      <button className={`btn-primary ${styles.btnSave}`}>
        Сохранить изменения
      </button>
    </form>
  );
}

export default FormSettings;
