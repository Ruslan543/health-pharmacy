import express from "express";
import basketController from "../controllers/basketController.js";
import authController from "../controllers/authController.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(basketController.setIDs, basketController.getAllBaskets)
  .post(basketController.createBasket);

router.get(
  "/getMyBasket",
  authController.protect,
  basketController.getMyBasket
);

router.use(
  authController.protect,
  authController.restrictTo(["admin", "lead-guide"])
);

router
  .route("/:id")
  .get(basketController.getOneBasket)
  .patch(basketController.updateBasket)
  .delete(basketController.deleteBasket);

export default router;
