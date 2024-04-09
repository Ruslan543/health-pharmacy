import mongoose from "mongoose";
import { productBasketSchema } from "../models/productBasketModel.js";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Поле user должно быть заполнено"],
  },
  products: {
    // type: [productBasketSchema],
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductBasket",
      },
    ],
    required: [true, "Поле products должно быть заполнено"],
  },
  totalPrice: {
    type: Number,
    min: [0, "Поле totalPrice не может быть меньше 0"],
  },
  totalProducts: {
    type: Number,
    min: [0, "Поле totalProducts не может быть меньше 0"],
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate("products");
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
