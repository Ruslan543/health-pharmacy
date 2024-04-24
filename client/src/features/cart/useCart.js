import { useQuery } from "@tanstack/react-query";
import apiBaskets from "../../services/apiBaskets";

function useCart() {
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: apiBaskets.getMyBasket,
  });

  return { cart };
}

export { useCart };
