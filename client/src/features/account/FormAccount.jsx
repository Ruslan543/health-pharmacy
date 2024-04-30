import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

import { NUMBER_TO_MONTH, MONTH_TO_NUMBER } from "../../utils/constans";
import { useUser } from "../authentication/useUser";
import { useAccountReducer } from "./useAccountReducer";
import { useUpdateMe } from "./useUpdateMe";

import InputBirthBox from "./InputBirthBox";
import InputBox from "./InputBox";
import styles from "./styles/FormAccount.module.scss";

function FormAccount() {
  const { user } = useUser();
  const { state, actions } = useAccountReducer();
  const { updateMe, isPending } = useUpdateMe();

  const isSameData = setIsSameData();

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
    [actions, state.day, state.month, state.year]
  );

  useEffect(
    function () {
      // const date = user.birthday;
      const date = new Date(1092171600000);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      actions.init({
        name: user.name,
        surname: user.surname,
        day,
        month: NUMBER_TO_MONTH[month],
        year,
      });
    },
    [actions, user.name, user.surname, user.birthday]
  );

  function handleSubmit(event) {
    event.preventDefault();

    const { name, surname, day, month, year } = state;
    const isFilledData = name && surname && day && year;

    if (!isFilledData) {
      return toast.error("Заполните все поля!");
    }

    const birthday = new Date(year, MONTH_TO_NUMBER[month], day);
    const body = { name, surname, birthday };

    updateMe({ body });
  }

  function setIsSameData() {
    let isEqual;

    const birthdayState = new Date(
      state.year,
      MONTH_TO_NUMBER[state.month],
      state.day
    ).getTime();
    const birthdayUser = new Date(1092171600000).getTime();
    // const birthdayUser = new Date(user.birthday).getTime();

    if (
      user.name === state.name &&
      user.surname === state.surname &&
      birthdayUser === birthdayState
    ) {
      isEqual = true;
    } else {
      isEqual = false;
    }

    return isEqual;
  }

  return (
    <form className={styles.formData} onSubmit={handleSubmit}>
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

      <button
        className={`btn-primary ${styles.btnSave}`}
        disabled={isPending || isSameData}
      >
        Сохранить изменения
      </button>
    </form>
  );
}

export default FormAccount;
