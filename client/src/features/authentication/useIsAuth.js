import { useQuery } from "@tanstack/react-query";

function useIsAuth() {
  const { data: isAuth } = useQuery({
    queryKey: ["isAuth"],
    staleTime: Infinity,
    retry: false,
  });

  return { isAuth };
}

export { useIsAuth };
