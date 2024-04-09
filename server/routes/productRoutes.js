import express from "express";
import productController from "../controllers/productController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo(["admin", "lead-guide"]),
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(
    authController.protect,
    authController.restrictTo(["admin", "lead-guide"]),
    productController.uploadProductImage,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo(["admin", "lead-guide"]),
    productController.deleteProduct
  );

router.get(
  "/userBasket/:basketId",
  productController.getAllProductsInUserBasket
);

export default router;
