import { ICategory } from '../types/interfaces';
import { BaseUrl, categories, users } from './constants';
import { $host } from './http';
import { IResultResponse } from './result-requerests';

export const createCategory = async (category: string) => {
  try {
    const response = await $host.post<ICategory>(
      `${BaseUrl}/${users}/${categories}`,
      { category: category },
      {
        withCredentials: true,
      }
    );
    console.log('response create', response.data);
    console.log('all response create:', response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCategory = async () => {
  try {
    const response = await $host.get<ICategory[]>(
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

export const deleteCategory = async (id: string) => {
  try {
    const response = await $host.delete<IResultResponse>(
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
