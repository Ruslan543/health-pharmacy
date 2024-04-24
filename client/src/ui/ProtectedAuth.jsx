import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

function ProtectedAuth() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(
    function () {
      if (user) {
        navigate("/", { replace: true });
      }
    },
    [user, navigate]
  );

  if (user) return null;

  return <Outlet />;
}

export default ProtectedAuth;
