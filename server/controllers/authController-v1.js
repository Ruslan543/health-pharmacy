import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Basket from "../models/basketModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

class AuthController {
  constructor() {
    this.signup = catchAsync(this.signup.bind(this));
    this.login = catchAsync(this.login.bind(this));
    this.protect = catchAsync(this.protect.bind(this));
    this.restrictTo = this.restrictTo.bind(this);
    this.refreshToken = catchAsync(this.refreshToken.bind(this));
    this.logout = catchAsync(this.logout.bind(this));
  }

  _signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  _signAccessToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
  }

  _signRefreshToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
  }

  _createSendToken(user, statusCode, request, response) {
    const token = this._signToken(user._id);

    response.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
      ),
      httpOnly: true,
      secure:
        request.secure || request.headers["x-forwarded-proto"] === "https",
    });

    user.password = undefined;

    response.status(statusCode).json({
      status: "success",
      token,
      data: { user },
    });
  }

  _createSendTokens(user, statusCode, request, response) {
    const accessToken = this._signAccessToken(user._id);
    const refreshToken = this._signRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure:
        request.secure || request.headers["x-forwarded-proto"] === "https",
    };

    response.cookie("refreshToken", refreshToken, {
      expires: new Date(
        Date.now() +
          process.env.JWT_COOKIE_REFRESH_EXPIRES_IN * 1000 * 60 * 60 * 24
      ),
      ...cookieOptions,
    });

    response.cookie("accessToken", accessToken, {
      expires: new Date(
        Date.now() +
          process.env.JWT_COOKIE_ACCESS_EXPIRES_IN * 1000 * 60 * 60 * 24
      ),
      ...cookieOptions,
    });

    user.password = undefined;

    response.status(statusCode).json({
      status: "success",
      accessToken,
      refreshToken,
      data: { user },
    });
  }

  async signup(request, response, next) {
    const { body } = request;

    const newUser = await User.create({
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: body.password,
      passwordConfirm: body.passwordConfirm,
    });

    const basket = await Basket.create({ user: newUser._id });
    newUser.basket = basket;

    this._createSendTokens(newUser, 201, request, response);
  }

  async login(request, response, next) {
    const { email, password } = request.body;

    if (!email || !password) {
      return next(new AppError("Пожалуйста введите email и password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        new AppError("Неправильная электронная почта или пароль", 401)
      );
    }

    this._createSendTokens(user, 200, request, response);
  }

  async protect(request, response, next) {
    const user = await this._verifyToken(request, next, "accessToken");
    if (!user) return;

    request.user = user;
    next();
  }

  restrictTo(roles) {
    return (request, response, next) => {
      if (!roles.includes(request.user.role)) {
        return next(
          new AppError("У вас нет разрешения на выполнение этого действия", 403)
        );
      }

      next();
    };
  }

  async refreshToken(request, response, next) {
    const user = await this._verifyToken(request, next, "refreshToken");
    if (!user) return;

    this._createSendTokens(user, 200, request, response);
  }

  async _verifyToken(request, next, typeToken) {
    const { authorization } = request.headers;
    const jwtToken = request.cookies[typeToken];

    const token = this._getToken(authorization, jwtToken);

    if (!token) {
      return next(
        new AppError(
          "Вы не авторизованы! Пожалуйста войдите, чтобы получить доступ.",
          401
        )
      );
    }

    const decoded = jwt.verify(token, this._getSecret(typeToken));
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError(
          "Пользователь, принадлежащий этому токену, не существует!",
          401
        )
      );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "Пользователь изменил пароль. Пожалуйста войдите ещё раз!",
          401
        )
      );
    }

    return currentUser;
  }

  _getSecret(typeToken) {
    if (typeToken === "accessToken") {
      return process.env.JWT_SECRET_ACCESS_TOKEN;
    }

    if (typeToken === "refreshToken") {
      return process.env.JWT_SECRET_REFRESH_TOKEN;
    }
  }

  _getToken(bearerToken, cookieToken) {
    if (bearerToken && bearerToken.startsWith("Bearer")) {
      return bearerToken.split(" ")[1];
    }

    if (cookieToken && cookieToken !== "loggedout") return cookieToken;

    return;
  }

  async logout(request, response, next) {
    const cookieOptions = {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    };

    response.cookie("accessToken", "loggedout", cookieOptions);
    response.cookie("refreshToken", "loggedout", cookieOptions);

    response.status(200).json({
      status: "success",
    });
  }
}

export default new AuthController();
