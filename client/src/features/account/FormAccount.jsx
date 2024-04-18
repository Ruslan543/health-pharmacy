import { useMemo } from "react";
import InputBirthBox from "./InputBirthBox";
import InputBox from "./InputBox";
import styles from "./styles/FormAccount.module.scss";

function FormAccount() {
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
    <form className={styles.formData}>
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

      <button className={`btn-primary ${styles.btnSave}`}>
        Сохранить изменения
      </button>
    </form>
  );
}

export default FormAccount;
