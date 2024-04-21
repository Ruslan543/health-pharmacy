import { useQuery } from "@tanstack/react-query";
import apiProducts from "../../services/apiProducts";

const { getProducts } = apiProducts;

function useProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { products, isLoading };
}

export { useProducts };
