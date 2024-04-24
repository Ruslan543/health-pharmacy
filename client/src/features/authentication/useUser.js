import { useQuery } from "@tanstack/react-query";
import apiAuth from "../../services/apiAuth";

const { getUser } = apiAuth;

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { user, isLoading };
}

export { useUser };
