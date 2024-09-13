import { IAddedDocument, IDocument, IUserData } from "../types/types";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const loginApi = async (userData: IUserData) => {
  try {
    const response = await fetch(
      `${baseUrl}/ru/data/v3/testmethods/docs/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await response.json();
    return result.data.token; // Вернуть токен
  } catch (error) {
    console.log(error);
    throw new Error("Ошибка авторизации");
  }
};

export const getData = async (token: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/ru/data/v3/testmethods/docs/userdocs/get`,
      {
        headers: {
          "x-auth": token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Ошибка получения данных");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error((error as Error).message || "Ошибка при получении данных");
  }
};

export const deleteData = async (id: string, token: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "x-auth": token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Ошибка получения данных");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error((error as Error).message) || "Ошибка запроса на удаление";
  }
};

export const postData = async (newItem: IAddedDocument, token: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/ru/data/v3/testmethods/docs/userdocs/create`,
      {
        method: "POST",
        headers: {
          "x-auth": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );
    if (!response.ok) {
      throw new Error("Ошибка получения данных");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error((error as Error).message) || "Ошибка запроса на добавление";
  }
};

export const postUpdateData = async (
  newItem: IDocument,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${baseUrl}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
      {
        method: "POST",
        headers: {
          "x-auth": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );
    if (!response.ok) {
      throw new Error("Ошибка получения данных");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error((error as Error).message) || "Ошибка запроса на изменение";
  }
};
