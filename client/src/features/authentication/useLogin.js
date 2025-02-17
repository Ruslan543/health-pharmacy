import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiAuth from "../../services/apiAuth";

function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: apiAuth.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      queryClient.setQueryData(["cart"], data.data.user.basket);
      queryClient.setQueryData(["accessToken"], data.accessToken);
      queryClient.setQueryData(["isAuth"], true);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { login, isPending };
}

export { useLogin };
