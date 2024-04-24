import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Пользователь должен иметь name"],
      trim: true,
    },
    surname: {
      type: String,
      required: [true, "Пользователь должен иметь surname"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Пользователь должен иметь email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Пожалуйста введите действительный email"],
    },
    password: {
      type: String,
      required: [true, "Пользователь должен иметь password"],
      minlength: [8, "Пароль должен состоять из 8 и более символов!"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Пожалуйста подтвердите пароль!"],
      validate: {
        validator(value) {
          return value === this.password;
        },
        message: "Пароли не совпадают!",
      },
    },
    role: {
      type: String,
      enum: ["user", "guide", "lead-guide", "admin"],
      default: "user",
    },
    createAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    passwordChangedAt: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    birthday: {
      type: Date,
      required: [true, "Пользователь должен иметь birthday"],
    },
    tokenCreatedAt: Date,
  },
  {
    methods: {
      async correctPassword(candidatePassword, userPassword) {
        return await bcrypt.compare(candidatePassword, userPassword);
      },

      groupIdenticalProducts(value) {
        const identicalProducts = value.reduce((acc, product) => {
          if (!acc[`${product.product}`]) {
            acc[`${product.product}`] = product;
          } else {
            acc[`${product.product}`].quantity += 1;
          }

          return acc;
        }, {});

        return Object.values(identicalProducts);
      },

      changedPasswordAfter(jwtTimestamp) {
        if (!this.passwordChangedAt) return false;

        const changedTimestamp = parseInt(
          this.passwordChangedAt.getTime() / 1000,
          10
        );

        return jwtTimestamp < changedTimestamp;
      },

      matchesTokenCreatedAt(timestamp) {
        if (!this.tokenCreatedAt) return false;

        const tokenCreatedAtTimestamp = parseInt(
          this.tokenCreatedAt.getTime() / 1000,
          10
        );

        return tokenCreatedAtTimestamp === timestamp;
      },
    },
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// userSchema.virtual("basket", {
//   ref: "Basket",
//   localField: "_id",
//   foreignField: "user",
//   get(value) {
//     const products = this.groupIdenticalProducts(value);
//     return { length: products.length, products };
//   },
// });

userSchema.virtual("basket", {
  ref: "Basket",
  localField: "_id",
  foreignField: "user",
  get: (value) => value?.[0],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.post("save", function (document, next) {
  this.password = undefined;
  this.createAt = undefined;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate("basket");
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
