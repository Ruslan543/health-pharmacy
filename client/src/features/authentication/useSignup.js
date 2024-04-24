import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiAuth from "../../services/apiAuth";

function useSignup() {
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: apiAuth.signup,
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

  return { signup, isPending };
}

export { useSignup };
