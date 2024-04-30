import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

class UserController {
  constructor() {
    this.getMe = catchAsync(this.getMe.bind(this));
    this.getAll = catchAsync(this.getAll.bind(this));
    this.getOne = catchAsync(this.getOne.bind(this));
    this.updateUser = catchAsync(this.updateUser.bind(this));
    this.deleteUser = catchAsync(this.deleteUser.bind(this));
    this.updateMe = catchAsync(this.updateMe.bind(this));
  }

  async getMe(request, response, next) {
    request.params.id = request.user._id;
    next();
  }

  async getAll(request, response, next) {
    const users = await User.find();

    response.status(200).json({
      status: "success",
      data: { users },
    });
  }

  async getOne(request, response, next) {
    const user = await User.findById(request.params.id);
    if (!user) return next(new AppError("Нет пользователя с таким ID", 404));

    response.status(200).json({
      status: "success",
      data: { user },
    });
  }

  async updateUser(request, response, next) {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });

    if (!user) return next(new AppError("Нет пользователя с таким ID", 404));

    response.status(200).json({
      status: "success",
      data: { user },
    });
  }

  async deleteUser(request, response, next) {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) return next(new AppError("Нет пользователя с таким ID", 404));

    response.status(204).json({
      status: "success",
      data: null,
    });
  }

  async updateMe(request, response, next) {
    const { password, passwordConfirm } = request.body;

    if (password || passwordConfirm) {
      return next(
        new AppError(
          "Этот маршрут не обновляет пароль! Используйте /updateMyPassword",
          400
        )
      );
    }

    const filteredBody = this._filterObject(request.body, [
      "name",
      "surname",
      "birthday",
    ]);
    const updatedUser = await User.findByIdAndUpdate(
      request.user._id,
      filteredBody,
      { new: true, runValidators: true }
    );

    response.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  }

  _filterObject(object, allowedFields) {
    const newObject = {};

    Object.keys(object).forEach((element) => {
      if (allowedFields.includes(element)) {
        newObject[element] = object[element];
      }
    });

    return newObject;
  }
}

export default new UserController();
