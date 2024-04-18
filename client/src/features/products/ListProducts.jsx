import ProductItem from "./ProductItem";
import styles from "./styles/ListProducts.module.scss";

function ListProducts() {
  return (
    <div className={styles.listProducts}>
      <ProductItem
        product={{
          image: "/medicaments-1.png",
          name: "Ибуфен Д",
          price: "7.99 BYN",
          quantity: 1,
        }}
      />
      <ProductItem
        product={{
          image: "/medicaments-1.png",
          name: "Ибуфен Д",
          price: "7.99 BYN",
          quantity: 1,
        }}
      />
      <ProductItem
        product={{
          image: "/medicaments-1.png",
          name: "Ибуфен Д",
          price: "7.99 BYN",
          quantity: 1,
        }}
      />
      <ProductItem
        product={{
          image: "/medicaments-1.png",
          name: "Ибуфен Д",
          price: "7.99 BYN",
          quantity: 1,
        }}
      />
      <ProductItem
        product={{
          image: "/medicaments-1.png",
          name: "Ибуфен Д",
          price: "7.99 BYN",
          quantity: 1,
        }}
      />
      <ProductItem
        product={{
          image: "/medicaments-1.png",
          name: "Ибуфен Д",
          price: "7.99 BYN",
          quantity: 1,
        }}
      />
      <ProductItem
        product={{
          image: "/medicaments-1.png",
          name: "Ибуфен Д",
          price: "7.99 BYN",
          quantity: 1,
        }}
      />
      <ProductItem
        product={{
          image: "/medicaments-1.png",
          name: "Ибуфен Д",
          price: "7.99 BYN",
          quantity: 1,
        }}
      />
    </div>
  );
}

export default ListProducts;
