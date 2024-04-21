import { SERVER_URL } from "../utils/constans";
import { middlewareAuth } from "./middlewares";

const baseUrl = `${SERVER_URL}/products`;

async function getProducts() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();

    if (data.status !== "success") {
      throw data;
    }

    return data.data.products;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
}

async function getProduct({ id }) {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    const data = await response.json();

    if (data !== "success") {
      throw data;
    }

    return data.data.product;
  } catch (error) {
    console.log(error.message);
    throw error.message;
  }
}

async function createProduct({ body, accessToken }) {
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
    data: data.data?.product,
  };
}

async function updateProduct({ id, body, accessToken }) {
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
    data: data.data?.product,
  };
}

async function deleteProduct({ id, accessToken }) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
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
    data: data.data?.product,
  };
}

export default {
  getProducts,
  getProduct,
  createProduct: middlewareAuth(createProduct),
  updateProduct: middlewareAuth(updateProduct),
  deleteProduct: middlewareAuth(deleteProduct),
};
