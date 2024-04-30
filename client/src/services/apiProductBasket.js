import { SERVER_URL } from "../utils/constans";
import { middlewareAuth } from "./middlewares";

const baseUrl = `${SERVER_URL}/productsBasket`;

async function getProductsBasket({ accessToken }) {
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
    data: data.data?.productsBasket,
  };
}

async function getProductBasket({ id, accessToken }) {
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
    data: data.data?.productsBasket,
  };
}

async function createProductBasket({ body, accessToken }) {
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
    data: data.data?.productBasket,
  };
}

async function updateProductBasket({ id, quantity, accessToken }) {
  const response = await fetch(`${baseUrl}/updateQuantity/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return {
    response,
    dataResponse: data,
    data: data.data?.productBasket,
  };
}

async function deleteProductBasket({ id, accessToken }) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let data;

  try {
    data = await response.json();
  } catch (error) {
    data = { status: "success" };
  }

  return {
    response,
    dataResponse: data,
    data: data.data?.productBasket,
  };
}

export default {
  getProductsBasket: middlewareAuth(getProductsBasket),
  getProductBasket: middlewareAuth(getProductBasket),
  createProductBasket: middlewareAuth(createProductBasket),
  updateProductBasket: middlewareAuth(updateProductBasket),
  deleteProductBasket: middlewareAuth(deleteProductBasket),
};
