import { useEffect } from "react";
import LoginForm from "../features/authentication/LoginForm";
import Authorization from "../features/authentication/Authorization";

function Login() {
  useEffect(function () {
    document.title = "HEALTH pharmacy | Вход";
  }, []);

  return (
    <Authorization>
      <LoginForm />
    </Authorization>
  );
}

export default Login;
