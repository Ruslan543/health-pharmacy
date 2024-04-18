import PropTypes from "prop-types";
import styles from "./styles/CartList.module.scss";
import CartItem from "./CartItem";

function CartList({ className }) {
  return (
    <div className={`${className} ${styles.list}`}>
      <CartItem
        product={{
          image: "/medicaments-1.png",
          name: "Ибуфен Д",
          price: 7.99,
          quantity: 1,
        }}
      />

      <CartItem
        product={{
          image: "/medicaments-2.jpeg",
          name: "Аскорбиновая кислота",
          price: 2.58,
          quantity: 1,
        }}
      />

      <CartItem
        product={{
          image: "/medicaments-3.jpg",
          name: "Анальгин",
          price: 3.99,
          quantity: 1,
        }}
      />
    </div>
  );
}

CartList.propTypes = {
  className: PropTypes.string,
};

export default CartList;
