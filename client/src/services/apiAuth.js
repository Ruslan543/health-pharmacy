import { SERVER_URL } from "../utils/constans";
import { queryClient, invalidateQueries } from "../store/queryClient";

const baseUrl = `${SERVER_URL}/users`;

const fields = {
  login: "логин",
  email: "e-mail",
  password: "пароль",
  passwordConfirm: "повтор пароля",
};

function setRefreshToken(token) {
  localStorage.setItem("refreshToken", token);
}

async function signup(data) {
  try {
    const response = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await response.json();

    if (userData.status !== "success") {
      throw userData;
    }

    setRefreshToken(userData.refreshToken);

    return userData;
  } catch (error) {
    let message = error.message;

    if (error.name === "MongoServerError") {
      console.log(error);
      message = `Такой ${fields[error.fieldDublicate]} существует!`;
    }

    console.log(message);
    throw message;
  }
}

async function login(data) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await response.json();

    if (userData.status !== "success") {
      throw userData;
    }

    setRefreshToken(userData.refreshToken);

    return userData;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
}

async function getUser() {
  try {
    const accessToken = queryClient.getQueryData(["accessToken"]);
    if (!accessToken) return null;

    const response = await fetch(`${baseUrl}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (response.status === 401) {
      invalidateQueries(["accessToken"]);
      throw data;
    }

    if (data.status !== "success") {
      console.log(data.message);
      return null;
    }

    return data.data.user;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
}

async function refreshToken() {
  try {
    const token = localStorage.getItem("refreshToken");
    if (!token) throw new Error("Вы не авторизованы!");

    const response = await fetch(`${baseUrl}/refreshToken`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status !== "success") {
      throw data;
    }

    localStorage.setItem("refreshToken", data.refreshToken);

    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function logout() {
  try {
    localStorage.removeItem("refreshToken");

    const response = await fetch(`${baseUrl}/logout`);
    const data = await response.json();

    if (data.status !== "success") {
      throw data;
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export default {
  signup,
  login,
  getUser,
  refreshToken,
  logout,
};
