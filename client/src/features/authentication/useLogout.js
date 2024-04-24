import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apiAuth from "../../services/apiAuth";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      queryClient.removeQueries();
      return apiAuth.logout();
    },
    onSuccess: () => {
      toast.success("Вы вышли из системы!");
      navigate("/", { replace: true });
    },
  });

  return { logout, isPending };
}

export { useLogout };
