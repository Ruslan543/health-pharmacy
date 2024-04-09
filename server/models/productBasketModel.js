import mongoose from "mongoose";

const productBasketSchema = new mongoose.Schema({
  basket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Basket",
    required: [true, "Поле basket должно быть заполнено"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Поле product должно быть заполнено"],
  },
  price: {
    type: Number,
    required: [true, "Поле price должно быть заполнено"],
  },
  purchased: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, "Поле quantity должно быть больше 0"],
  },
});

const ProductBasket = mongoose.model("ProductBasket", productBasketSchema);

export { productBasketSchema };

export default ProductBasket;
