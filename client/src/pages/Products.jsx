import { useEffect } from "react";
import ProductsSection from "../features/products/ProductsSection";

function Products() {
  useEffect(function () {
    document.title = "HEALTH pharmacy | Продукция";
  }, []);

  return <ProductsSection />;
}

export default Products;
