import multer from "multer";
import { __dirname } from "../dirname.js";

import Controller from "./controller.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const PATHNAME_IMAGE = "images/products";

const multerStorage = multer.diskStorage({
  destination: `public/${PATHNAME_IMAGE}`,
  filename: function (req, file, cb) {
    const pathname = `product-${
      request.params.id
    }-${Date.now()}.${file.originalname.split(".").at(-1)}`;

    req.body.image = `${PATHNAME_IMAGE}/${pathname}`;

    cb(null, pathname);
  },
});

// const populateObject = {
//   getAllProductsInUserBasket: {
//     path: "userBasket",
//     match: { purchased: false, basket: request.params.basketId },
//   },
// };

class ProductController extends Controller {
  constructor() {
    super(Product, "product");

    this.getAllProducts = catchAsync(this.getAllDocuments.bind(this));
    this.getOneProduct = catchAsync(this.getOneProduct.bind(this));
    this.createProduct = catchAsync(this.createProduct.bind(this));
    this.updateProduct = catchAsync(this.updateProduct.bind(this));
    this.deleteProduct = catchAsync(this.deleteProduct.bind(this));
    this.getAllProductsInUserBasket = catchAsync(
      this.getAllProductsInUserBasket.bind(this)
    );

    this._multerUpload = multer({
      storage: multerStorage,
      fileFilter: this._multerFilter,
    });
    this.uploadProductImage = this._multerUpload.single("image");
  }

  _multerFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      return cb(null, true);
    }

    cb(
      new AppError("Не изображение! Пожалуйста загружайте только изображения!"),
      false
    );
  }

  async getAllProducts(request, response, next) {
    const products = await Product.find();

    response.status(200).json({
      status: "success",
      data: { products },
    });
  }

  async getOneProduct(request, response, next) {
    const product = await Product.findById(request.params.id);
    if (!product) return next(new AppError("Нет продукта с таким ID", 404));

    response.status(200).json({
      status: "success",
      data: { product },
    });
  }

  async createProduct(request, response, next) {
    const product = await Product.create(request.body);

    response.status(201).json({
      status: "success",
      data: { product },
    });
  }

  async updateProduct(request, response, next) {
    const product = await Product.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!product) return next(new AppError("Нет продукта с таким ID", 404));

    response.status(200).json({
      status: "success",
      data: { product },
    });
  }

  async deleteProduct(request, response, next) {
    const product = await Product.findByIdAndDelete(request.params.id);
    if (!product) return next(new AppError("Нет продукта с таким ID", 404));

    response.status(204).json({
      status: "success",
      data: null,
    });
  }

  async getAllProductsInUserBasket(request, response, next) {
    const products = await this._addQuery({
      query: Product.find(),
      queryString: request.query,
      populate: {
        path: "userBasket",
        match: { purchased: false, basket: request.params.basketId },
      },
    });

    response.status(200).json({
      status: "success",
      data: { products },
    });
  }
}

export default new ProductController();

// const products = await Product.find().populate({
//   path: "userBasket",
//   match: { purchased: false, basket: request.params.basketId },
// });
