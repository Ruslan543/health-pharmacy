import Basket from "../models/basketModel.js";
import Order from "../models/orderModel.js";
import ProductBasket from "../models/productBasketModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

class OrderController {
  constructor() {
    this.getOrders = catchAsync(this.getOrders.bind(this));
    this.getOrder = catchAsync(this.getOrder.bind(this));
    this.createOrder = catchAsync(this.createOrder.bind(this));
    this.updateOrder = catchAsync(this.updateOrder.bind(this));
    this.deleteOrder = catchAsync(this.deleteOrder.bind(this));
    this.setMyUser = this.setMyUser.bind(this);
  }

  setMyUser(request, response, next) {
    request.filterObject = { user: request.user._id };
    next();
  }

  async getOrders(request, response, next) {
    request.filterObject = request.filterObject ?? {};
    const orders = await Order.find(request.filterObject);

    response.status(200).json({
      status: "success",
      data: { orders },
    });
  }

  async getOrder(request, response, next) {
    const order = await Order.findById(request.params.id);

    if (!order) {
      return next(new AppError("Не существует заказа с таким ID!", 404));
    }

    response.status(200).json({
      status: "success",
      data: { order },
    });
  }

  async createOrder(request, response, next) {
    const newOrder = await Order.create(request.body);
    const basket = await Basket.findOne({ user: request.user._id });

    const productsUpdate = basket.products.map((product) => {
      return {
        updateOne: {
          filter: { _id: product._id },
          update: { purchased: true },
        },
      };
    });
    await ProductBasket.bulkWrite(productsUpdate);

    response.status(201).json({
      status: "success",
      data: { order: newOrder },
    });
  }

  async updateOrder(request, response, next) {
    const order = await Order.findByIdAndUpdate(
      request.params.id,
      request.body,
      { runValidators: true, new: true }
    );

    if (!order) {
      return next(new AppError("Не существует заказа с таким ID!", 404));
    }

    response.status(200).json({
      status: "success",
      data: { order },
    });
  }

  async deleteOrder(request, response, next) {
    const order = await Order.findByIdAndDelete(request.params.id);

    if (!order) {
      return next(new AppError("Не существует заказа с таким ID!", 404));
    }

    response.status(204).json({
      status: "success",
      data: null,
    });
  }
}

export default new OrderController();
