import { useEffect } from "react";
import toast from "react-hot-toast";

import { useUser } from "../authentication/useUser";
import { useUpdateMyEmail } from "./useUpdateEmail";
import { useSettingsReducer } from "./useSettingsReducer";

import InputBox from "../account/InputBox";
import styles from "../account/styles/FormAccount.module.scss";

function FormSettings() {
  const { user } = useUser();
  const { state, actions } = useSettingsReducer();
  const { updateMyEmail, isPending } = useUpdateMyEmail();

  const isSameData =
    user.email === state.email || !state.email || !state.password;

  useEffect(
    function () {
      actions.init({ email: user.email });
    },
    [actions, user.email]
  );

  function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = state;
    if (!email || !password) {
      return toast.error("Введите email и пароль!");
    }

    updateMyEmail({
      body: { email, passwordCurrent: password },
    });
  }

  return (
    <form className={styles.formData} onSubmit={handleSubmit}>
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

      {/* <InputBox name="Подтвердите пароль" htmlFor="passwordConfirm">
        <input
          className={styles.input}
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="Введите пароль повторно"
          value={state.passwordConfirm}
          onChange={(event) => actions.setPasswordConfirm(event.target.value)}
        />
      </InputBox> */}

      <button
        className={`btn-primary ${styles.btnSave}`}
        disabled={isPending || isSameData}
      >
        {isPending ? "Загрузка..." : "Сохранить изменения"}
      </button>
    </form>
  );
}

export default FormSettings;
