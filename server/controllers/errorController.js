import AppError from "../utils/appError.js";

class ErrorController {
  constructor() {
    this.errorHandler = this.errorHandler.bind(this);
  }

  async errorHandler(error, request, response, next) {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    if (process.env.NODE_ENV === "development") {
      return this._sendErrorDevelopment(error, response);
    }

    if (process.env.NODE_ENV === "production") {
      let errorProduction = {
        ...error,
        message: error.message,
        name: error.name,
      };

      if (errorProduction.name === "CastError") {
        errorProduction = this._handlerCastErrorDB(errorProduction);
      }

      if (errorProduction.code === 11000) {
        errorProduction = this._handleDublicateFieldsDB(errorProduction);
      }

      if (errorProduction.name === "ValidationError") {
        errorProduction = this._handlerValidationErrorDB(errorProduction);
      }

      if (errorProduction.name === "JsonWebTokenError") {
        errorProduction = this._handlerJWTToken();
      }

      if (errorProduction.name === "TokenExpiredError") {
        errorProduction = this._handlerJWTExpiredError();
      }

      return this._sendErrorProduction(errorProduction, response);
    }
  }

  _sendErrorDevelopment(error, response) {
    response.status(error.statusCode).json({
      status: error.status,
      error,
      message: error.message,
      stack: error.stack,
    });
  }

  _sendErrorProduction(error, response) {
    if (error.isOperational) {
      return response.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        name: error.name,
        errorMessages: error.errorMessages,
        fieldDublicate: error.fieldDublicate,
      });
    }

    response.status(500).json({
      status: "error",
      message: "Что-то пошло не так!",
    });
  }

  _handlerJWTToken() {
    const error = new AppError(
      "Недействительный токен. Пожалуйста повторите вход!",
      401,
      "JsonWebTokenError"
    );

    return error;
  }

  _handlerValidationErrorDB(error) {
    const errorMessages = {};
    const errors = Object.keys(error.errors)
      .map((element) => {
        const { message } = error.errors[element];
        errorMessages[element] = message;

        return message;
      })
      .join(". ");

    const message = `Недействительны входные данные! ${errors}`;
    const newError = new AppError(message, 400, error.name);
    newError.errorMessages = errorMessages;

    return newError;
  }

  _handlerCastErrorDB(error) {
    const message = `Не действительный ${error.path}: ${error.value}`;
    return new AppError(message, 404, error.name);
  }

  _handlerJWTExpiredError() {
    const error = new AppError(
      "Срок действия вашего токена истек! Пожалуйста, войдите снова.",
      401,
      "TokenExpiredError"
    );

    return error;
  }

  _handleDublicateFieldsDB(error) {
    // const value = error.message.match(/(["'])(\\?.)*?\1/)[0];
    const key = Object.keys(error.keyValue)[0];
    const value = error.keyValue[key];
    const message = `Поле '${key}' со значением '${value}' существует!`;
    // const message = `Повторяющееся значение поля: ${value}. Пожалуйста, используйте другое значение!`;

    const newError = new AppError(message, 400, error.name);
    newError.fieldDublicate = key;

    return newError;
  }
}

const { errorHandler } = new ErrorController();

export default errorHandler;
