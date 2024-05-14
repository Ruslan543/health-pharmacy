import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Email from "../utils/email.js";
import Basket from "../models/basketModel.js";

// const buffer = Buffer.from(
//   "eyJpZCI6IjY1YjRmYjQ4YjJjYjMwNmU0ZGQ1YWE0MiIsImNyZWF0ZWRBdCI6MTcwNzMzNjg5MTUzMSwiaWF0IjoxNzA3MzM2ODkxLCJleHAiOjE3MDk5Mjg4OTF9",
//   "base64"
// ).toString("utf-8");

// const payload = JSON.parse(buffer);
// console.log(payload);

class AuthController {
  constructor() {
    this.signup = catchAsync(this.signup.bind(this));
    this.login = catchAsync(this.login.bind(this));
    this.protect = catchAsync(this.protect.bind(this));
    this.restrictTo = this.restrictTo.bind(this);
    this.logout = catchAsync(this.logout.bind(this));
    this.refreshToken = catchAsync(this.refreshToken.bind(this));
    this.forgotPassword = catchAsync(this.forgotPassword.bind(this));
    this.resetPassword = catchAsync(this.resetPassword.bind(this));
    this.checkResetToken = catchAsync(this.checkResetToken.bind(this));
    this.updatePassword = catchAsync(this.updatePassword.bind(this));
    this.updateEmail = catchAsync(this.updateEmail.bind(this));
  }

  _signAccessToken(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    return token;
  }

  _signRefreshToken(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return token;
  }

  async _createSendTokens(user, statusCode, request, response) {
    const accessToken = this._signAccessToken(user._id);
    const refreshToken = this._signRefreshToken(user._id);

    user.tokenCreatedAt = Date.now();
    await user.save({ validateBeforeSave: false });

    const cookieOptions = {
      httpOnly: true,
      secure:
        request.secure || request.headers["x-forwarded-proto"] === "https",
    };

    response.cookie("accessToken", accessToken, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_ACCESS_EXPIRES_IN * 1000 * 60
      ),
      ...cookieOptions,
    });

    response.cookie("refreshToken", refreshToken, {
      expires: new Date(
        Date.now() +
          process.env.JWT_COOKIE_REFRESH_EXPIRES_IN * 1000 * 60 * 60 * 24
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
      birthday: body.birthday,
      createAt: Date.now(),
    });

    const basket = await Basket.create({ user: newUser._id });
    newUser.basket = basket;

    await this._createSendTokens(newUser, 201, request, response);
  }

  async login(request, response, next) {
    const { email, password } = request.body;

    if (!email || !password) {
      return next(new AppError("Пожалуйста введите email и пароль", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Неправильный логин или пароль", 401));
    }

    await this._createSendTokens(user, 200, request, response);
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
          new AppError("У вас нет разрешения на выполнения этого действия", 403)
        );
      }

      next();
    };
  }

  async logout(request, response, next) {
    try {
      const user = await this._verifyToken(request, () => null, "accessToken");

      user.tokenExpiresAt = undefined;
      await user.save({ validateBeforeSave: false });
    } catch (error) {}

    const cookieOptions = {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      secure:
        request.secure || request.headers["x-forwarded-proto"] === "https",
      // sameSite: "None",
    };

    response.cookie("accessToken", "loggedout", cookieOptions);
    response.cookie("refreshToken", "loggedout", cookieOptions);

    response.status(200).json({
      status: "success",
    });
  }

  async refreshToken(request, response, next) {
    const user = await this._verifyToken(request, next, "refreshToken");
    if (!user) return;

    await this._createSendTokens(user, 200, request, response);
  }

  async _verifyToken(request, next, tokenType) {
    const { authorization } = request.headers;
    const jwtToken = request.cookies[tokenType];

    const token = this._getToken(authorization, jwtToken);

    if (!token) {
      return next(
        new AppError(
          "Вы не авторизованы! Пожалуйста войдите, чтобы получить доступ!",
          401
        )
      );
    }

    const decoded = jwt.verify(token, this._getSecret(tokenType));
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
          "Пользователь изменил пароль! Пожалуйста войдите ещё раз!",
          401
        )
      );
    }

    if (
      tokenType === "refreshToken" &&
      !currentUser.matchesTokenCreatedAt(decoded.iat)
    ) {
      return next(
        new AppError("Токен недействительный! Пожалуйста войдите ещё раз!", 401)
      );
    }

    return currentUser;
  }

  _getToken(bearerToken, cookieToken) {
    if (bearerToken && bearerToken.startsWith("Bearer")) {
      return bearerToken.split(" ")[1];
    }

    if (cookieToken) return cookieToken;

    return;
  }

  _getSecret(tokenType) {
    if (tokenType === "accessToken") {
      return process.env.JWT_SECRET_ACCESS_TOKEN;
    }

    if (tokenType === "refreshToken") {
      return process.env.JWT_SECRET_REFRESH_TOKEN;
    }
  }

  async forgotPassword(request, response, next) {
    const { email } = request.body;

    if (!email) {
      return next(new AppError("Пожалуйста введите email.", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("Пользователь с таким логином не найден!", 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      const resetURL = `${process.env.URL_CLIENT}/resetPassword/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          "Произошла ошибка при отправлении письма на email. Попробуйте позже!",
          500
        )
      );
    }

    response.status(200).json({
      status: "success",
      message: "Ваш токен сброса отправлен на email.",
      token: resetToken,
    });
  }

  async checkResetToken(request, response, next) {
    const user = await this._verifyResetToken(next, request.params.token);
    if (!user) return;

    response.status(200).json({
      status: "success",
    });
  }

  async resetPassword(request, response, next) {
    const user = await this._verifyResetToken(next, request.params.token);
    if (!user) return;

    user.password = request.body.password;
    user.passwordConfirm = request.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    await this._createSendTokens(user, 200, request, response);
  }

  async _verifyResetToken(next, resetToken) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new AppError("Токен недействительный или срок его действия истёк", 400)
      );
    }

    return user;
  }

  async protectConfirmEmail(request, response, next) {
    if (!request.user.confirm) {
      return next(
        new AppError(
          "Не подтвержена электронная почта! Пожалуйста подтвердите её.",
          403
        )
      );
    }

    next();
  }

  async updatePassword(request, response, next) {
    const { passwordCurrent, password, passwordConfirm } = request.body;
    const user = await User.findById(request.user._id).select("+password");

    if (!(await user.correctPassword(passwordCurrent, user.password))) {
      return next(new AppError("Неверный текущий пароль!", 401));
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    await user.save();

    this._createSendTokens(user, 200, request, response);
  }

  async updateEmail(request, response, next) {
    const { email, passwordCurrent } = request.body;
    const user = await User.findById(request.user._id).select("+password");

    if (!(await user.correctPassword(passwordCurrent, user.password))) {
      return next(new AppError("Неверный пароль!", 401));
    }

    user.email = email;
    await user.save({ validateModifiedOnly: true });

    response.status(200).json({
      status: "success",
      data: { user },
    });
  }
}

export default new AuthController();
