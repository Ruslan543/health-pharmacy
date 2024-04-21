import { SERVER_URL } from "../utils/constans";
import { middlewareAuth } from "./middlewares";

const baseUrl = `${SERVER_URL}/baskets`;

async function getBaskets() {
  const response = await fetch(baseUrl);
  const data = await response.json();

  return {
    response,
    dataResponse: data,
    data: data.data?.baskets,
  };
}

async function getBasket({ id, userId, accessToken }) {
  let apiUrl;

  if (userId) {
    apiUrl = `${SERVER_URL}/users/${userId}/basket`;
  } else {
    apiUrl = `${baseUrl}/${id}`;
  }

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  if (userId) {
    data.data.basket = data.data.baskets[0];
    delete data.data.baskets;
  }

  return {
    response,
    dataResponse: data,
    data: data.data?.basket,
  };
}

async function createBasket({ body, accessToken }) {
  const response = await fetch(baseUrl, {
    method: "POST",
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
    data: data.data?.basket,
  };
}

async function updateBasket({ id, body, accessToken }) {
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
    data: data.data?.basket,
  };
}

async function deleteBasket({ id, accessToken }) {
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
    data: data.data?.basket,
  };
}

async function getMyBasket({ accessToken }) {
  const response = await fetch(`${baseUrl}/getMyBasket`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  return {
    response,
    dataResponse: data,
    data: data.data?.basket,
  };
}

export default {
  getBaskets,
  getBasket: middlewareAuth(getBasket),
  createBasket: middlewareAuth(createBasket),
  updateBasket: middlewareAuth(updateBasket),
  deleteBasket: middlewareAuth(deleteBasket),
  getMyBasket: middlewareAuth(getMyBasket),
};
