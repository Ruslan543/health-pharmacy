import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { MONTH_TO_NUMBER } from "../../utils/constans";
import { useSignupReducer } from "./useSignupReducer";
import { useSignup } from "./useSignup";
import { convertDate } from "../../utils/helper";

import InputBox from "../account/InputBox";
import InputBirthBox from "../account/InputBirthBox";

import styles from "../account/styles/FormAccount.module.scss";
import stylesSignupForm from "./styles/SignupForm.module.scss";

function SignupForm() {
  const navigate = useNavigate();

  const { signup, isPending } = useSignup();
  const { state, actions } = useSignupReducer();

  const optionsInputBirthBox = useMemo(
    () => ({
      inputs: {
        birthday: {
          value: state.day,
          onChange: (event) => actions.setDay(event.target.value),
        },
        dateOfBirth: {
          value: state.month,
          onChange: (event) => actions.setMonth(event.target.value),
        },
        yearBirth: {
          value: state.year,
          onChange: (event) => actions.setYear(event.target.value),
        },
      },
    }),
    [state.day, state.month, state.year, actions]
  );

  function handleSubmit(event) {
    event.preventDefault();

    const { name, surname, email, password, passwordConfirm, day, year } =
      state;
    const isFilledData =
      name && surname && email && password && passwordConfirm && day && year;

    if (!isFilledData) {
      return toast.error("Заполните все поля!");
    }

    const birthday = new Date(
      state.year,
      MONTH_TO_NUMBER[state.month],
      state.day
    );

    signup(
      { name, surname, email, password, passwordConfirm, birthday },
      {
        onSuccess: () => navigate("/"),
      }
    );
  }

  return (
    <form
      className={`${stylesSignupForm.formData} ${styles.formData}`}
      onSubmit={handleSubmit}
    >
      <InputBox name="Имя" htmlFor="name">
        <input
          className={styles.input}
          id="name"
          name="name"
          type="text"
          placeholder="Введите имя"
          value={state.name}
          onChange={(event) => actions.setName(event.target.value)}
        />
      </InputBox>

      <InputBox name="Фамилия" htmlFor="surname">
        <input
          className={styles.input}
          id="surname"
          name="surname"
          type="text"
          placeholder="Введите фамилию"
          value={state.surname}
          onChange={(event) => actions.setSurname(event.target.value)}
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

      <button
        className={`btn-primary ${styles.btnSave} ${stylesSignupForm.btn}`}
        disabled={isPending}
      >
        {isPending ? "Загрузка..." : "Зарегистрироваться"}
      </button>
    </form>
  );
}

export default SignupForm;
