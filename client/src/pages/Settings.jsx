import { useEffect } from "react";
import AccountSection from "../features/account/AccountSection";
import FormSettings from "../features/settings/FormSettings";

function Settings() {
  useEffect(function () {
    document.title = "HEALTH pharmacy | Настройки";
  }, []);

  return (
    <AccountSection>
      <FormSettings />
    </AccountSection>
  );
}

export default Settings;
