import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiUsers from "../../services/apiUsers";

function useUpdateMe() {
  const queryClient = useQueryClient();
  const { mutate: updateMe, isPending } = useMutation({
    mutationFn: apiUsers.updateMe,
    onSuccess: (user) => {
      toast.success("Пользователь обновлён!");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return { updateMe, isPending };
}

export { useUpdateMe };
