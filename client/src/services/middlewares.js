import { getAccessToken, invalidateQueries } from "../store/queryClient";

export function middlewareAuth(callback) {
  return async (data) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) throw new Error("Вы не авторизованы!");

      const dataObject = await callback({ ...data, accessToken });
      if (!dataObject) return null;

      const { response, dataResponse, data: dataFetch } = dataObject;

      if (response.status === 401) {
        invalidateQueries(["accessToken"]);
        throw dataResponse;
      }

      if (dataResponse.status !== "success") {
        throw dataResponse;
      }

      return dataFetch;
    } catch (error) {
      console.log(error.message);
      throw error.message;
    }
  };
}
