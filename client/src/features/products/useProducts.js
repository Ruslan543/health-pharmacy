import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiProducts from "../../services/apiProducts";

const { getProducts, getProductsInUserBasket } = apiProducts;

function useProducts() {
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const user = queryClient.getQueryData(["user"]);

      if (user) {
        return await getProductsInUserBasket({ user });
      } else {
        return await getProducts();
      }
    },
  });

  return { products, isLoading };
}

export { useProducts };
