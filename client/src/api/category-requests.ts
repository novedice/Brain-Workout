import { ICategory } from '../types/interfaces';
import { BaseUrl, categories, users } from './constants';
import { $authHost } from './http';
import { IResultResponse } from './result-requerests';

export const createCategory = async (category: string) => {
  try {
    const response = await $authHost.post<ICategory>(
      `${BaseUrl}/${users}/${categories}`,
      { category: category },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCategory = async () => {
  try {
    const response = await $authHost.get<ICategory[]>(
      `${BaseUrl}/${users}/${categories}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const response = await $authHost.delete<IResultResponse>(
      `${BaseUrl}/${users}/${categories}/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
