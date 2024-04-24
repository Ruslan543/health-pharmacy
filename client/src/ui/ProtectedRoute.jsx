import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useUser } from "../features/authentication/useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(
    function () {
      if (!user) {
        navigate("/", { replace: true });
      }
    },
    [user, navigate]
  );

  if (!user) return null;

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;
