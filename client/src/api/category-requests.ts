import { BaseUrl, categories, users } from "./constants";
import { $host } from "./http";
import { IResultResponse } from "./result-requerests";

export const createCategory = async (category: string) => {
  try {
    const response = await $host.post<IResultResponse>(`${BaseUrl}/${users}/${categories}`, category, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCategory = async () => {
  try {
    const response = await $host.get<IResultResponse>(`${BaseUrl}/${users}/${categories}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteCategory = async (id: string) => {
  try {
    const response = await $host.delete<IResultResponse>(`${BaseUrl}/${users}/${categories}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};