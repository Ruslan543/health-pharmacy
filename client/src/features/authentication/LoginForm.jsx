import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import { useLogin } from "./useLogin";
import InputBox from "../account/InputBox";
import styles from "../account/styles/FormAccount.module.scss";
import stylesLoginForm from "./styles/LoginForm.module.scss";

function LoginForm() {
  const navigate = useNavigate();
  const { login, isPending } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) {
      return toast.error("Заполните все поля!");
    }

    login(
      { email, password },
      {
        onSuccess: () => navigate("/"),
        onError: () => setPassword(""),
      }
    );
  }

  return (
    <form
      className={`${stylesLoginForm.formData} ${styles.formData}`}
      onSubmit={handleLogin}
    >
      <InputBox name="E-mail" htmlFor="email">
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Введите e-mail"
        />
      </InputBox>

      <InputBox name="Пароль" htmlFor="password">
        <input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Введите пароль"
        />
      </InputBox>

      <button className={`btn-primary ${styles.btnSave}`} disabled={isPending}>
        {isPending ? "Загрузка..." : "Войти"}
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
