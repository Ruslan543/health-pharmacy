import mongoose from "mongoose";

const basketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Поле user должно быть заполнено"],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

basketSchema.virtual("products", {
  ref: "ProductBasket",
  localField: "_id",
  foreignField: "basket",
});

basketSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
    match: { purchased: false },
    populate: "product",
  });
  next();
});

// basketSchema.pre(/^find/, function (next) {
//   this.populate("products.product");
//   next();
// });

const Basket = mongoose.model("Basket", basketSchema);

export default Basket;
