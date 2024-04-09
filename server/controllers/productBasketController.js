import ProductBasket from "../models/productBasketModel.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

class ProductBasketController {
  constructor() {
    this.getAllProductsBasket = catchAsync(
      this.getAllProductsBasket.bind(this)
    );
    this.getOneProductBasket = catchAsync(this.getOneProductBasket.bind(this));
    this.createProductBasket = catchAsync(this.createProductBasket.bind(this));
    this.updateProductBasket = catchAsync(this.updateProductBasket.bind(this));
    this.deleteProductBasket = catchAsync(this.deleteProductBasket.bind(this));
    this.updateQuantity = catchAsync(this.updateQuantity.bind(this));
  }

  async getAllProductsBasket(request, response, next) {
    const productsBasket = await ProductBasket.find();

    response.status(200).json({
      status: "success",
      data: { productsBasket },
    });
  }

  async getOneProductBasket(request, response, next) {
    const productBasket = await ProductBasket.findById(request.params.id);

    if (!productBasket) {
      return next(new AppError("Нет продукта с таким ID", 404));
    }

    response.status(200).json({
      status: "success",
      data: { productBasket },
    });
  }

  // async createProductBasket(request, response, next) {
  //   const product = await Product.findById(request.body.product);

  //   if (!product) {
  //     return next(new AppError("Не существует продукта с таким ID", 404));
  //   }

  //   if (product.quantity === 0) {
  //     return next(new AppError("Продукта нет в наличии", 400));
  //   }

  //   const productBasket = await ProductBasket.create(request.body);

  //   product.quantity--;
  //   await product.save();

  //   response.status(201).json({
  //     status: "success",
  //     data: { productBasket },
  //   });
  // }

  async createProductBasket(request, response, next) {
    const product = await Product.findById(request.body.product);

    if (!product) {
      return next(new AppError("Не существует продукта с таким ID", 404));
    }

    if (product.quantity === 0) {
      return next(new AppError("Продукта нет в наличии", 400));
    }

    let productBasket = await ProductBasket.findOne({
      basket: request.body.basket,
      product: product._id,
    });

    if (!productBasket) {
      productBasket = await ProductBasket.create(request.body);
    } else {
      productBasket.quantity++;
      await productBasket.save();
    }

    product.quantity--;
    await product.save();

    response.status(201).json({
      status: "success",
      data: { productBasket },
    });
  }

  async updateProductBasket(request, response, next) {
    const productBasket = await ProductBasket.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!productBasket) {
      return next(new AppError("Нет продукта с таким ID", 404));
    }

    response.status(200).json({
      status: "success",
      data: { productBasket },
    });
  }

  async deleteProductBasket(request, response, next) {
    const productBasket = await ProductBasket.findByIdAndDelete(
      request.params.id
    );

    if (!productBasket) {
      return next(new AppError("Нет продукта с таким ID", 404));
    }

    const product = await Product.findById(productBasket.product);
    product.quantity += productBasket.quantity;
    await product.save();

    response.status(204).json({
      status: "success",
      data: null,
    });
  }

  async updateQuantity(request, response, next) {
    const productBasket = await ProductBasket.findById(request.params.id);

    if (!productBasket) {
      return next(
        new AppError("Не существует продукта корзины с таким ID", 404)
      );
    }

    const product = await Product.findById(productBasket.product);
    const quantity = product.calculateQuantity(
      productBasket.quantity,
      request.body.quantity
    );

    if (quantity < 0) {
      return next(new AppError("Нет в наличии такого количества товара", 400));
    }

    productBasket.quantity = request.body.quantity;
    await productBasket.save();

    product.quantity = quantity;
    await product.save();

    response.status(200).json({
      status: "success",
      data: { productBasket },
    });
  }
}

export default new ProductBasketController();
