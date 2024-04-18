import { useEffect } from "react";
import AccountSection from "../features/account/AccountSection";
import FormAccount from "../features/account/FormAccount";

function Account() {
  useEffect(function () {
    document.title = "HEALTH pharmacy | Профиль";
  }, []);

  return (
    <AccountSection>
      <FormAccount />
    </AccountSection>
  );
}

export default Account;
