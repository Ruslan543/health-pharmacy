import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { __dirname } from "./dirname.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import basketRouter from "./routes/basketRoutes.js";
import productBasketRouter from "./routes/productBasketRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/baskets", basketRouter);
app.use("/api/v1/productsBasket", productBasketRouter);
app.use("/api/v1/orders", orderRoutes);

app.all("*", (request, response, next) => {
  next(
    new AppError(`Не найдено пути ${request.originalUrl} на этом сервере!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
