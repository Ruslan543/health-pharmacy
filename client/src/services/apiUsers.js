import { SERVER_URL } from "../utils/constans";
import { middlewareAuth } from "./middlewares";

const baseUrl = `${SERVER_URL}/users`;

async function getUsers({ accessToken }) {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  return {
    response,
    dataResponse: data,
    data: data.data?.users,
  };
}

async function getUser({ id, accessToken }) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  return {
    response,
    dataResponse: data,
    data: data.data?.users,
  };
}

async function updateUser({ id, body, accessToken }) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return {
    response,
    dataResponse: data,
    data: data.data?.users,
  };
}

async function deleteUser({ id, accessToken }) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  return {
    response,
    dataResponse: data,
    data: data.data?.users,
  };
}

async function updateMe({ body, accessToken }) {
  const response = await fetch(`${baseUrl}/updateMe`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return {
    response,
    dataResponse: data,
    data: data.data?.user,
  };
}

export default {
  getUsers: middlewareAuth(getUsers),
  getUser: middlewareAuth(getUser),
  updateUser: middlewareAuth(updateUser),
  deleteUser: middlewareAuth(deleteUser),
  updateMe: middlewareAuth(updateMe),
};
