import Spinner from "../../ui/Spinner";
import ProductItem from "./ProductItem";
import styles from "./styles/ListProducts.module.scss";
import { useProducts } from "./useProducts";

function ListProducts() {
  const { products, isLoading } = useProducts();

  return <Spinner />;

  // return (
  //   <div className={styles.listProducts}>
  //     {products.map((product) => (
  //       <ProductItem product={product} key={product._id} />
  //     ))}

  //     {/* <ProductItem
  //       product={{
  //         image: "/medicaments-1.png",
  //         name: "Ибуфен Д",
  //         price: "7.99 BYN",
  //         quantity: 1,
  //       }}
  //     />
  //     <ProductItem
  //       product={{
  //         image: "/medicaments-1.png",
  //         name: "Ибуфен Д",
  //         price: "7.99 BYN",
  //         quantity: 1,
  //       }}
  //     />
  //     <ProductItem
  //       product={{
  //         image: "/medicaments-1.png",
  //         name: "Ибуфен Д",
  //         price: "7.99 BYN",
  //         quantity: 1,
  //       }}
  //     />
  //     <ProductItem
  //       product={{
  //         image: "/medicaments-1.png",
  //         name: "Ибуфен Д",
  //         price: "7.99 BYN",
  //         quantity: 1,
  //       }}
  //     />
  //     <ProductItem
  //       product={{
  //         image: "/medicaments-1.png",
  //         name: "Ибуфен Д",
  //         price: "7.99 BYN",
  //         quantity: 1,
  //       }}
  //     />
  //     <ProductItem
  //       product={{
  //         image: "/medicaments-1.png",
  //         name: "Ибуфен Д",
  //         price: "7.99 BYN",
  //         quantity: 1,
  //       }}
  //     />
  //     <ProductItem
  //       product={{
  //         image: "/medicaments-1.png",
  //         name: "Ибуфен Д",
  //         price: "7.99 BYN",
  //         quantity: 1,
  //       }}
  //     />
  //     <ProductItem
  //       product={{
  //         image: "/medicaments-1.png",
  //         name: "Ибуфен Д",
  //         price: "7.99 BYN",
  //         quantity: 1,
  //       }}
  //     /> */}
  //   </div>
  // );
}

export default ListProducts;
