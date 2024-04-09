import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export function getAccessToken() {
  return queryClient.getQueryData(["accessToken"]);
}

export function invalidateQueries(queryKey) {
  queryClient.invalidateQueries(queryKey, { cancelRefetch: false });
}

export { queryClient };
