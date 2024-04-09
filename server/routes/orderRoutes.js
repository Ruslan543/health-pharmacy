import express from "express";
import authController from "../controllers/authController.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.use(authController.protect);

router.get("/myOrders", orderController.setMyUser, orderController.getOrders);

router
  .route("/")
  .get(orderController.getOrders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default router;
