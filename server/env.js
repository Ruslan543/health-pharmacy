import dotenv from "dotenv";

process.on("uncaughtException", (error) => {
  console.log("НЕПОЙМАННОЕ ИСКЛЮЧЕНИЕ! 💥 Выключаем...");
  console.log(error.name, error.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
