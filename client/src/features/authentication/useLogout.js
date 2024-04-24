import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import apiAuth from "../../services/apiAuth";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      navigate("/", { replace: true });
      queryClient.removeQueries();
      return apiAuth.logout();
    },
  });

  return { logout, isPending };
}

export { useLogout };
