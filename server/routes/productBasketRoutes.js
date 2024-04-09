import express from "express";
import productBasketController from "../controllers/productBasketController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo(["admin", "lead-guide"]),
    productBasketController.getAllProductsBasket
  )
  .post(productBasketController.createProductBasket);

router.use(authController.protect);
router.patch("/updateQuantity/:id", productBasketController.updateQuantity);
router.use(authController.restrictTo(["admin", "lead-guide"]));

router
  .route("/:id")
  .get(productBasketController.getOneProductBasket)
  .patch(productBasketController.updateProductBasket)
  .delete(productBasketController.deleteProductBasket);

export default router;
