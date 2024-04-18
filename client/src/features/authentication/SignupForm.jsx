import { useMemo } from "react";

import InputBox from "../account/InputBox";
import InputBirthBox from "../account/InputBirthBox";

import styles from "../account/styles/FormAccount.module.scss";
import stylesSignupForm from "./styles/SignupForm.module.scss";

function SignupForm() {
  const optionsInputBirthBox = useMemo(
    () => ({
      inputs: {
        birthday: {
          value: "",
          onChange: () => {},
        },
        dateOfBirth: {
          value: "",
          onChange: () => {},
        },
        yearBirth: {
          value: "",
          onChange: () => {},
        },
      },
    }),
    []
  );

  return (
    <form className={`${stylesSignupForm.formData} ${styles.formData}`}>
      <InputBox name="Имя" htmlFor="name">
        <input
          className={styles.input}
          id="name"
          name="name"
          type="text"
          placeholder="Введите имя"
        />
      </InputBox>

      <InputBox name="Фамилия" htmlFor="surname">
        <input
          className={styles.input}
          id="surname"
          name="surname"
          type="text"
          placeholder="Введите фамилию"
        />
      </InputBox>

      <InputBox name="Дата рождения" htmlFor="birthday">
        <InputBirthBox options={optionsInputBirthBox} />
      </InputBox>

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

      <InputBox name="Подтвердите пароль" htmlFor="passwordConfirm">
        <input
          className={styles.input}
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="Введите пароль повторно"
        />
      </InputBox>

      <button
        className={`btn-primary ${styles.btnSave} ${stylesSignupForm.btn}`}
      >
        Зарегистрироваться
      </button>
    </form>
  );
}

export default SignupForm;
