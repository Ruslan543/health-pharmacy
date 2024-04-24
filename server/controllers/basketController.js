import mongoose from "mongoose";
import Basket from "../models/basketModel.js";
import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

class BasketController {
  constructor() {
    this.getAllBaskets = catchAsync(this.getAllBaskets.bind(this));
    this.getOneBasket = catchAsync(this.getOneBasket.bind(this));
    this.createBasket = catchAsync(this.createBasket.bind(this));
    this.updateBasket = catchAsync(this.updateBasket.bind(this));
    this.deleteBasket = catchAsync(this.deleteBasket.bind(this));
    this.setIDs = catchAsync(this.setIDs.bind(this));
    this.getMyBasket = catchAsync(this.getMyBasket.bind(this));
  }

  filterBasket(filter) {
    if (!Object.keys(filter).length) {
      return Basket.find();
    }

    const basket = Basket.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(filter.userId),
          purchased: false,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $group: {
          _id: {
            user: "$user",
            product: "$product",
          },
          quantity: { $sum: 1 },
        },
      },
      {
        $addFields: {
          user: "$_id.user",
          product: { $arrayElemAt: ["$_id.product", 0] },
        },
      },
      {
        $project: { _id: 0 },
      },
    ]);

    return basket;
  }

  async getAllBaskets(request, response, next) {
    const baskets = await this.filterBasket(request.filterObject);

    response.status(200).json({
      status: "success",
      data: { baskets },
    });
  }

  async getOneBasket(request, response, next) {
    const basket = await Basket.findById(request.params.id);

    if (!basket) {
      return next(new AppError("Не существует basket с таким id", 404));
    }

    response.status(200).json({
      status: "success",
      data: { basket },
    });
  }

  async createBasket(request, response, next) {
    const product = await Product.findById(request.body.product);
    if (!product) return next(new AppError("Нет продукта с таким ID", 404));

    if (product.quantity === 0) {
      return next(new AppError("Продукта нет в наличии", 400));
    }

    const newBasket = await Basket.create({
      ...request.body,
      purchased: undefined,
    });

    product.quantity -= 1;
    await product.save();

    response.status(201).json({
      status: "success",
      data: { basket: newBasket },
    });
  }

  async setIDs(request, response, next) {
    const { userId } = request.params;
    const filter = {};

    if (userId) filter.userId = userId;

    request.filterObject = filter;
    next();
  }

  async updateBasket(request, response, next) {
    const basket = await Basket.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!basket) return next(new AppError("Нет корзины с таким ID", 404));

    response.status(200).json({
      status: "success",
      data: { basket },
    });
  }

  async deleteBasket(request, response, next) {
    const basket = await Basket.findByIdAndDelete(request.params.id);
    if (!basket) return next(new AppError("Нет корзины с таким ID", 404));

    response.status(204).json({
      status: "success",
      data: null,
    });
  }

  async getMyBasket(request, response, next) {
    const basket = await Basket.findOne({ user: request.user._id });

    if (!basket) {
      return next(new AppError("Корзина для пользователя не найдена", 404));
    }

    response.status(200).json({
      status: "success",
      data: { basket },
    });
  }
}

export default new BasketController();
