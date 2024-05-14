import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiUsers from "../../services/apiUsers";

function useUpdateMyEmail() {
  const queryClient = useQueryClient();
  const { mutate: updateMyEmail, isPending } = useMutation({
    mutationFn: apiUsers.updateMyEmail,
    onSuccess: (user) => {
      toast.success("Email успешно обновлён!");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => toast.error(error),
  });

  return { updateMyEmail, isPending };
}

export { useUpdateMyEmail };
