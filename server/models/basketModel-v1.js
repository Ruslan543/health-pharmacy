import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Поле user должно быть заполнено"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Поле product должно быть заполнено"],
  },
  quantity: {
    type: Number,
    required: [true, "Поле quantity должно быть заполнено"],
  },
  price: {
    type: Number,
  },
  purchased: {
    type: Boolean,
    default: false,
    select: false,
  },
});

basketSchema.pre(/^find/, function (next) {
  this.populate("product");
  next();
});

const Basket = mongoose.model("Basket", basketSchema);

export default Basket;
