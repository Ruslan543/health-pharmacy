import express from "express";
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";
import basketRouter from "../routes/basketRoutes.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/refreshToken", authController.refreshToken);
router.get("/logout", authController.logout);

router.use(authController.protect);

router.get("/me", userController.getMe, userController.getOne);
router.use("/:userId/basket", basketRouter);

router.use(authController.restrictTo(["admin", "lead-guide"]));

router.route("/").get(userController.getAll);
router
  .route("/:id")
  .get(userController.getOne)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
