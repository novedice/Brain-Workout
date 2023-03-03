import { IResData } from '../types/interfaces';
import { BaseUrl, results, users } from './constants';
import { $authHost } from './http';

export interface IResultResponse {
  id: number;
  value: number;
  gameId: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export const getUserResults = async () => {
  try {
    const response = await $authHost.get<IResultResponse[]>(
      `${BaseUrl}/${users}/${results}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const createResult = async (resData: IResData) => {
  try {
    const response = await $authHost.post<IResultResponse>(
      `${BaseUrl}/${users}/${results}`,
      resData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getBestResult = async (gameId: number, sort: 'ASC' | 'DESC') => {
  try {
    const response = await $authHost.get<{ value: number }>(
      `${BaseUrl}/${users}/${results}/best?gameId=${gameId}&sort=${sort}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
