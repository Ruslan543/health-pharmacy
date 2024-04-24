import mongoose from "mongoose";
import "./env.js";
import app from "./app.js";

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DATABASE connection successful!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (error) => {
  console.log("НЕОБРАБОТАННЫЙ ОТКАЗ! 💥 Выключаем...");
  console.log(error.name, error.message);

  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("👋 СИГНАЛ ПОЛУЧЕН. Грамотное выключение");

  server.close(() => {
    console.log("💥 Процесс прекращен!");
  });
});

// import { Server } from "socket.io";
// import { createServer } from "http";

// const httpServer = createServer(app);
// const io = new Server(httpServer);

// io.on("connection", (socket) => {
//   console.log("ID: ", socket.id);
//   socket.on("message", (message) => console.log("Message: ", message));

//   socket.on("disconnect", () => {
//     console.log(`Client with id ${socket.id} disconnected`);
//   });
// });
