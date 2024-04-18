import { useEffect } from "react";
import Authorization from "../features/authentication/Authorization";
import SignupForm from "../features/authentication/SignupForm";

function Signup() {
  useEffect(function () {
    document.title = "HEALTH pharmacy | Регистрация";
  }, []);

  return (
    <Authorization type="signup">
      <SignupForm />
    </Authorization>
  );
}

export default Signup;
