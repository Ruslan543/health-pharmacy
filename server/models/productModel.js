import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Продукт должен иметь name!"],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Продукт должен иметь price!"],
      min: [0, "Поле price не может быть меньше 0"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: function (props) {
          return `Скидка (${props.value}) не может быть больше цены!`;
        },
      },
    },
    image: {
      type: String,
      required: [true, "Продукт должен иметь imageUrl!"],
    },
    quantity: {
      type: Number,
      required: [true, "Продукт должен иметь quantity!"],
      min: [0, "Поле quantity не может быть меньше 0"],
    },
  },
  {
    methods: {
      calculateQuantity(basketQuantity, currentQuantity) {
        const changesQuantity = basketQuantity - currentQuantity;
        const quantity = this.quantity + changesQuantity;

        return quantity;
      },
    },
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

productSchema.virtual("userBasket", {
  ref: "ProductBasket",
  localField: "_id",
  foreignField: "product",
  get(value) {
    return value?.[0];
  },
});

const Product = mongoose.model("Product", productSchema);

export { productSchema };

export default Product;
