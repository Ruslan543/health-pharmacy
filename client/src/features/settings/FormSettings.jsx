import InputBox from "../account/InputBox";
import styles from "../account/styles/FormAccount.module.scss";

function FormSettings() {
  return (
    <form className={styles.formData}>
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

      <button className={`btn-primary ${styles.btnSave}`}>
        Сохранить изменения
      </button>
    </form>
  );
}

export default FormSettings;
