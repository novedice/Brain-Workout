// import { AxiosError } from 'axios';
// import { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
import { IResData } from '../types/interfaces';
import { BaseUrl, results, users } from './constants';
import { $host } from './http';

export interface IResultResponse {
  id: number;
  value: number;
  gameId: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

// export const getUserResults = () => {
//   const [userResults, setUserResults] = useState<IResultResponse[]>();
//   const [resError, setResError] = useState('');
//   const fetchResults = async () => {
//     try {
//       const response = await $host.get<IResultResponse[]>(
//         `${BaseUrl}/${users}/${results}`,
//         { withCredentials: true }
//       );
//       setUserResults(response.data);
//     } catch (e) {
//       setResError((e as AxiosError).message);
//     }
//   };
//   useEffect(() => {
//     fetchResults();
//   });
//   return { userResults, resError };
// };
export const getUserResults = async () => {
  // let response: IResultResponse[];
  // let error = '';
  try {
    const response = await $host.get<IResultResponse[]>(
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
    const response = await $host.post<IResultResponse>(
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
    const response = await $host.get<{ value: number }>(
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
