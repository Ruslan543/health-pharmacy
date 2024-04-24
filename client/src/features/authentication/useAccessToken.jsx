import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiAuth from "../../services/apiAuth";

function getQuery(queryClient) {
  return async () => {
    const data = await apiAuth.refreshToken();

    if (!data) {
      queryClient.setQueryData(["user"], null);
      queryClient.setQueryData(["isAuth"], (oldData) => {
        if (oldData !== undefined) return false;
      });

      return null;
    }

    queryClient.setQueryData(["user"], data.data.user);
    queryClient.setQueryData(["isAuth"], true);
    return data.accessToken;
  };
}

function useAccessToken() {
  const queryClient = useQueryClient();
  const { data: accessToken, isLoading } = useQuery({
    queryKey: ["accessToken"],
    queryFn: getQuery(queryClient),
    retry: false,
    refetchInterval: () => 18 * 1000 * 60,
    staleTime: 18 * 1000 * 60,
  });

  return { accessToken, isLoading };
}

export { useAccessToken };
