import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiProductBasket from "../../services/apiProductBasket";

function useUpdateQuantity() {
  let toastId;

  const queryClient = useQueryClient();
  const { mutate: updateQuantity, isPending } = useMutation({
    mutationFn: (data) => {
      toastId = toast.loading("Загрузка...");

      if (data.type === "increment") {
        if (!data.productBasket) {
          return apiProductBasket.createProductBasket({
            body: {
              product: data.product._id,
              price: data.product.price,
            },
          });
        }

        return apiProductBasket.updateProductBasket({
          id: data.productBasket._id,
          quantity: data.quantityProduct + 1,
        });
      }

      if (data.type === "decrement") {
        if (data.quantityProduct - 1 === 0) {
          return apiProductBasket.deleteProductBasket({
            id: data.productBasket._id,
          });
        }

        return apiProductBasket.updateProductBasket({
          id: data.productBasket._id,
          quantity: data.quantityProduct - 1,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onSettled: () => toast.dismiss(toastId),
  });

  return { updateQuantity, isPending };
}

export { useUpdateQuantity };
